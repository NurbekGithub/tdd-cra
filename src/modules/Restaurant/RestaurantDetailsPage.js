import React, {useState} from 'react'
import { Button, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import NewDishForm from './NewDishForm';
import DishesList from './DishesList';

export default function RestaurantDetailsPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [dishes, setRestaurants] = useState([]);

  function handleSubmit(values, actions) {
    setRestaurants(prevState => [...prevState, values.name]);
    setModalVisible(false);
    actions.setSubmitting(false);
  }

  return (
    <div>
      <Button variant='outlined' onClick={() => setModalVisible(true)}>Add dish</Button>
      <Dialog open={modalVisible}>
        <DialogTitle>
          New dish
          <Button onClick={() => setModalVisible(false)}>cancel</Button>
        </DialogTitle>
        <DialogContent>
          <NewDishForm handleSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
      <DishesList dishes={dishes} />
    </div>
  )
}
