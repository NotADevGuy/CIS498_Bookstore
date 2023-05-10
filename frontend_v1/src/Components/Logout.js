import React from "react";

export function Logout() {
    sessionStorage.setItem("login", 0);
    sessionStorage.setItem("admin", 0);
}