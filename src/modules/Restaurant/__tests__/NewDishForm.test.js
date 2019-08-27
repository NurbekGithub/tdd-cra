import React from 'react';
import {render, fireEvent, wait, cleanup} from '@testing-library/react';
import NewDishForm from '../NewDishForm';

afterEach(cleanup);

describe('<NewDishForm />', () => {
  const submitMock = jest.fn();
  it('calls the handleSubmit with dish name', async () => {
    const { getByLabelText, getByTestId } = render(<NewDishForm handleSubmit={submitMock}/>)
    const dishName = "Vulcano";
      const argsMock = {
        values: {name: dishName},
        actions: expect.anything()
      }
      const input = getByLabelText("name");

      fireEvent.change(input, { target: { value: dishName } });
      // bug in jsdom https://github.com/testing-library/react-testing-library/issues/234
      // fireEvent.click(getByText("save"));
      // so we have to fire submit on form itself
      fireEvent.submit(getByTestId("NewDishForm"));
      await wait(() => {
        expect(submitMock).toHaveBeenCalledWith(argsMock.values, argsMock.actions);
      })
  })
  it('validates if empty submit', async () => {
    const submitMock = jest.fn();
    const { getByTestId } = render(<NewDishForm handleSubmit={submitMock}/>)
    fireEvent.submit(getByTestId("NewDishForm"));
      await wait(() => {
        expect(submitMock).toHaveBeenCalledTimes(0);
      })
  })
})
