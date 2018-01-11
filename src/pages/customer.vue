<template>
  <div class="customer">
    <br/>

    <h1 class="is-size-1">Customer</h1>

    <br/>

    <div class="container has-text-left">
      <router-link to="/add/customer">
        <button class="button is-link">
          Add Customer
        </button>
      </router-link>
    </div>

    <br/>

    <div class="container">
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
        <tr>
          <th>
            No
          </th>
          <th>
            Name
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="customers.length === 0">
          <td colspan="3">
            Customer is empty
          </td>
        </tr>
        <tr v-for="(customer, index) in customers">
          <td>
            {{index + 1}}
          </td>
          <td>
            {{customer.name}}
          </td>
          <td>
            <router-link :to="'/add/customer/' + customer.id">
              <button class="button is-primary is-size-7">
                Edit
              </button>
            </router-link>
            <router-link :to="'/customer/' + customer.id + '/address'">
              <button class="button is-info is-size-7">
                Show Address
              </button>
            </router-link>
            <button class="button is-danger is-size-7" @click="deleteCustomer(customer.id, index)">
              Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'customer',
    data: function () {
      return {
        customers: []
      }
    },
    mounted: function () {
      this.getCustomers()
    },
    methods: {
      getCustomers: function () {
        const URL = '/api/customers'

        axios.get(URL)
          .then(response => {
            alert('Success get customer data')

            this.customers = response.data
          })
          .catch(error => {
            alert(error)
          })
      },
      deleteCustomer: function (customerId, index) {
        const URL = '/api/customers/' + customerId

        axios.delete(URL)
          .then(response => {
            alert('Delete customer success')

            this.customers.splice(index, 1)
          })
          .catch(error => {
            alert(error)
          })
      }
    }
  }
</script>

<style scoped>

</style>
