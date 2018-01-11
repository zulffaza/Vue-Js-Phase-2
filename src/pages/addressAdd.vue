<template>
  <div class="address-add">
    <br/>

    <h1 class="is-size-1">{{customer.name}} - Address</h1>

    <br/>

    <div class="container has-text-left">
      <router-link :to="'/customer/' + customer.id + '/address'">
        <button class="button is-link">
          Address
        </button>
      </router-link>
    </div>

    <br/>

    <div class="container">
      <div class="field">
        <label class="label has-text-left">Country</label>
        <div class="control">
          <input class="input" type="text" placeholder="Customer country" v-model="country" required>
        </div>
      </div>
      <div class="field">
        <label class="label has-text-left">Province</label>
        <div class="control">
          <input class="input" type="text" placeholder="Customer province" v-model="province" required>
        </div>
      </div>
      <div class="field">
        <label class="label has-text-left">City</label>
        <div class="control">
          <input class="input" type="text" placeholder="Customer city" v-model="city" required>
        </div>
      </div>
      <div class="field">
        <label class="label has-text-left">Street</label>
        <div class="control">
          <input class="input" type="text" placeholder="Customer street" v-model="street" required>
        </div>
      </div>
      <div class="field">
        <div class="control has-text-right">
          <button class="button is-link" @click="sendRequest">Submit</button>
        </div>
      </div>
    </div>

    <br/>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'address-add',
    data: function () {
      return {
        customer: {},
        id: undefined,
        country: undefined,
        province: undefined,
        city: undefined,
        street: undefined
      }
    },
    mounted: function () {
      this.customer = {
        id: this.$route.params.customerId
      }

      this.id = this.$route.params.id

      if (this.customer.id !== undefined) {
        this.getCustomer()
      }

      if (this.id !== undefined) {
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
        const URL = '/api/customers/' + this.customer.id + '/address/' + this.id

        axios.get(URL)
          .then(response => {
            const address = response.data

            this.country = address.country
            this.province = address.province
            this.city = address.city
            this.street = address.street
          })
          .catch(error => {
            alert(error)
          })
      },
      sendRequest: function () {
        if (this.id === undefined) {
          this.saveAddress()
        } else {
          this.editAddress()
        }
      },
      saveAddress: function () {
        const URL = '/api/customers/' + this.customer.id + '/address'
        const argument = {
          country: this.country,
          province: this.province,
          city: this.city,
          street: this.street
        }

        axios.post(URL, argument)
          .then(response => {
            alert('Success save address')

            if (response.data !== undefined) {
              this.country = ''
              this.province = ''
              this.city = ''
              this.street = ''
            }
          })
          .catch(error => {
            alert(error)
          })
      },
      editAddress: function () {
        const URL = '/api/customers/' + this.customer.id + '/address/' + this.id
        const argument = {
          country: this.country,
          province: this.province,
          city: this.city,
          street: this.street
        }

        axios.put(URL, argument)
          .then(response => {
            alert('Success edit address')

            if (response.data !== undefined) {
              const address = response.data

              this.country = address.country
              this.province = address.province
              this.city = address.city
              this.street = address.street
            }
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
