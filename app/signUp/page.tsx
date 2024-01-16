"use client"
import { useState } from "react"
import React from "react"

function signUp() {
  const email = ""
  const password = ""

  return (
    <div>
      <input type="email" placeholder="Email" value={email} />
      <input type="password" placeholder="Password" value={password} />
    </div>
  )
}

export default signUp
