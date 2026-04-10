"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { login } from "@/store/authSlice"

export default function AuthLoader() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      dispatch(login({ token }))
    }
  }, [])

  return null
}