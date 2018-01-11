<template>
  <div class="address">
    <br/>

    <h1 class="is-size-1">{{customer.name}} - Address</h1>

    <br/>

    <div class="container has-text-left">
      <router-link to="/customer">
        <button class="button is-success">
          Customer
        </button>
      </router-link>
      <router-link :to="'/add/customer/' + customer.id + '/address'">
        <button class="button is-link">
          Add Address
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
            Country
          </th>
          <th>
            Province
          </th>
          <th>
            City
          </th>
          <th>
            Street
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="addresses.length === 0">
          <td colspan="3">
            Address is empty
          </td>
        </tr>
        <tr v-for="(address, index) in addresses">
          <td>
            {{index + 1}}
          </td>
          <td>
            {{address.country}}
          </td>
          <td>
            {{address.province}}
          </td>
          <td>
            {{address.city}}
          </td>
          <td>
            {{address.street}}
          </td>
          <td>
            <router-link :to="'/add/customer/' + customer.id + '/address/' + address.id">
              <button class="button is-primary is-size-7">
                Edit
              </button>
            </router-link>
            <button class="button is-danger is-size-7" v-if="addresses.length > 1"
                    @click="deleteAddress(customer.id, address.id, index)">
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
    name: 'address',
    data: function () {
      return {
        customer: {},
        addresses: []
      }
    },
    mounted: function () {
      this.customer = {
        id: this.$route.params.id
      }

      if (this.customer.id !== undefined) {
        this.getCustomer()
        this.getAddress()
      }
    },
    methods: {
      getCustomer: function () {
        const URL = '/api/customers/' + this.customer.id

        axios.get(URL)
          .then(response => {
            const customer = response.data

            this.customer.name = customer.name
          })
          .catch(error => {
            alert(error)
          })
      },
      getAddress: function () {
        const URL = '/api/customers/' + this.customer.id + '/address'

        axios.get(URL)
          .then(response => {
            alert('Success get address data')

            this.addresses = response.data
          })
          .catch(error => {
            alert(error)
          })
      },
      deleteAddress: function (customerId, addressId, index) {
        const URL = '/api/customers/' + customerId + '/address/' + addressId

        axios.delete(URL)
          .then(response => {
            alert('Delete address success')

            this.addresses.splice(index, 1)
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
