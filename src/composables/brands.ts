import { ref, Ref, watch } from 'vue'
import { regexMatcher } from './regex'
import axios from 'axios' // Import Axios

import Visa from '../assets/visa.svg'
import Master from '../assets/master.svg'

import Amex from '../assets/amex.svg'
export const brandIcons = {
  master: Master,
  visa: Visa,
  amex: Amex,
  default: null,
}

export const brand: Ref<'default' | 'visa' | 'master' | 'amex'> = ref('default')

export const colors = {
  default: ['#202024', '#121214'],
  amex: ['#39339F50', '#5151d5'],
  visa: ['#436D99', '#2D57F2'],

  master: ['#C69347', '#DF6F29'],
}

export let results: Ref<Object> = ref({})
export let authorize: Ref<string> = ref('')
export let token: Ref<string> = ref('')

export let email: Ref<string> = ref('')
export let cardNumber: Ref<string> = ref('')
export let cvv: Ref<string> = ref('')
export let expiration: Ref<string> = ref('')
export let isLoading: Ref<boolean> = ref(false)
export let unavailableSubmitAction: Ref<boolean> = ref(true)

export let timeouts: number[] = []
export async function handleSubmit(event: Event) {
  event.preventDefault()
  isLoading.value = true
  const [expirationMonth, expirationYear] = expiration.value.split('/')
  const cardNumberValue = cardNumber.value.replace(/\s/g, '') // Remove spaces
  const cvvNumberValue = cvv.value.trim() // Remove leading/trailing spaces
  const cardNumberAsNumeric = parseInt(cardNumberValue, 10) // Convert to a number
  const cvvNumberAsNumeric = parseInt(cvvNumberValue, 10) // Convert to a number

  const formData = {
    card_number: cardNumberAsNumeric,
    cvv: cvvNumberAsNumeric,
    expiration_month: expirationMonth,
    expiration_year: expirationYear,
    email: email.value,
  }
  const headers = {
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer ' + authorize.value,
    'Content-Type': 'application/json',
  }
  try {
    const response = await axios.post(
      'http://localhost:3000/tokens',
      formData,
      {
        headers: headers,
      },
    )
    isLoading.value = false

    if (response.status === 201) {
      // Reset form values
      email.value = ''
      cardNumber.value = ''
      cvv.value = ''
      expiration.value = ''
      brand.value = 'default'
      results.value = response.data

      alert('Card successfully saved :D')
    } else {
      alert('Error submitting the form. Please try again.')
    }
  } catch (error) {
    isLoading.value = false
    console.error('Error:', error)
    if (error.response && error.response.status === 400) {
      results.value = error.response.data
      console.error('Response Data:', results)
    } else {
      if (!authorize || !/^pk_test_[A-Za-z0-9]+$/.test(authorize)) {
        alert('Bearer Token not found. Please try again later.')
      } else {
        alert(
          'An error occurred while submitting the form. Please try again later.',
        )
      }
    }
  }
}
export async function searchByToken(event: Event) {
  event.preventDefault()
  isLoading.value = true

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://localhost:3000/tokens/${token.value}`,
    headers: {
      Authorization: 'Bearer ' + authorize.value,
    },
  }
  try {
    const response = await axios.request(config)
    isLoading.value = false

    if (response.status === 201) {
      // Reset form values
      email.value = response.data.email
      cardNumber.value = response.data.card_number.toString()
      cvv.value = ''
      expiration.value =
        response.data.expiration_month + '/' + response.data.expiration_year
      brand.value = 'default'
      results.value = response.data
    } else {
      alert('Error submitting the form. Please try again.')
    }
  } catch (error) {
    isLoading.value = false
    console.error('Error:', error)
    if (error.response && error.response.status === 400) {
      results.value = error.response.data
      console.error('Response Data:', results)
    } else {
      if (!authorize || !/^pk_test_[A-Za-z0-9]+$/.test(authorize)) {
        alert('Bearer Token not found. Please try again later.')
      } else {
        alert(
          'An error occurred while submitting the form. Please try again later.',
        )
      }
    }
  }
}

export function changeCCBrand(value: string) {
  if (value.length < 6) return

  const matchedBrand = regexMatcher(value)
  brand.value = matchedBrand
}

watch([email, cardNumber, cvv, expiration], () => {
  if (!email.value || !cardNumber.value || !cvv.value || !expiration.value) {
    unavailableSubmitAction.value = true
  } else {
    unavailableSubmitAction.value = false
  }
})
