"use client"

import { Customer } from "@medusajs/medusa"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"

import { updateCustomerName } from "@modules/account/actions"

import AccountInfo from "../account-info"
import { TextInput } from "@mantine/core"

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">
}

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)

  const [state, formAction] = useFormState(updateCustomerName, {
    error: false,
    success: false,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  return (
    <form action={formAction} className="w-full overflow-visible">
      <AccountInfo
        label="Name"
        currentInfo={`${customer.first_name} ${customer.last_name}`}
        isSuccess={successState}
        isError={!!state?.error}
        clearState={clearState}
      >
        <div className="grid grid-cols-2 gap-x-4">
          <TextInput
            label="First name"
            name="first_name"
            required
            defaultValue={customer.first_name}
          />
          <TextInput
            label="Last name"
            name="last_name"
            required
            defaultValue={customer.last_name}
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileName
