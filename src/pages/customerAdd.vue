<template>
  <div class="customer-add">
    <br/>

    <h1 class="is-size-1">Customer</h1>

    <br/>

    <div class="container has-text-left">
      <router-link to="/customer">
        <button class="button is-link">
          Customer
        </button>
      </router-link>
    </div>

    <br/>

    <div class="container">
      <div class="field">
        <label class="label has-text-left">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Customer name" v-model="name" required>
        </div>
      </div>
      <div class="field" v-if="id === undefined">
        <label class="label has-text-left">Country</label>
        <div class="control">
          <input class="input" type="text" placeholder="Customer country" v-model="country" required>
        </div>
      </div>
      <div class="field" v-if="id === undefined">
        <label class="label has-text-left">Province</label>
        <div class="control">
          <input class="input" type="text" placeholder="Customer province" v-model="province" required>
        </div>
      </div>
      <div class="field" v-if="id === undefined">
        <label class="label has-text-left">City</label>
        <div class="control">
          <input class="input" type="text" placeholder="Customer city" v-model="city" required>
        </div>
      </div>
      <div class="field" v-if="id === undefined">
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
    name: 'customer-add',
    data: function () {
      return {
        id: undefined,
        name: undefined,
        country: undefined,
        province: undefined,
        city: undefined,
        street: undefined
      }
    },
    mounted: function () {
      this.id = this.$route.params.id

      if (this.id !== undefined) {
        this.getCustomer()
      }
    },
    methods: {
      getCustomer: function () {
        const URL = '/api/customers/' + this.id

        axios.get(URL)
          .then(response => {
            const customer = response.data

            this.name = customer.name
          })
          .catch(error => {
            alert(error)
          })
      },
      sendRequest: function () {
        if (this.id === undefined) {
          this.saveCustomer()
        } else {
          this.editCustomer()
        }
      },
      saveCustomer: function () {
        const URL = '/api/customers'
        const argument = {
          name: this.name,
          address: {
            country: this.country,
            province: this.province,
            city: this.city,
            street: this.street
          }
        }

        axios.post(URL, argument)
          .then(response => {
            alert('Success save customer')

            if (response.data !== undefined) {
              this.name = ''
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
      editCustomer: function () {
        const URL = '/api/customers/' + this.id
        const argument = {
          name: this.name
        }

        axios.put(URL, argument)
          .then(response => {
            alert('Success edit customer')

            if (response.data !== undefined) {
              this.name = response.data.name
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
