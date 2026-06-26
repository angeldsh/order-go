# 🍔 Order & Go - User Manual

Welcome to the **Order & Go** application. This document provides instructions and test credentials to explore the different workflows and user roles within the system.

> [!NOTE]
> For security reasons, **Admin access is disabled** in the live preview to protect the integrity of the application's core data. You do not need to manually select a role when logging in; the system automatically detects your permissions based on your account.

## 🔗 Live Preview
Access the live application here: [https://orderandgoo.netlify.app/welcome](https://orderandgoo.netlify.app/welcome)

---

## 🍽️ Dine-In (Table Orders)

You can simulate a customer sitting at a table inside the restaurant. This flow does **not** require logging in.

- **How to test:** On the welcome screen, look for the option to enter a table code.
- **Active Table Code:** `GEIVTB`

Entering this code will link your current session to a specific table, allowing you to add items to the cart and place an order directly to the kitchen.

---

## 🛵 Delivery & Takeaway (Client Access)

If you want to simulate a customer ordering from home (Delivery or Takeaway), you need to log in as a Client. While you can register a new account from the outside (which automatically assigns the Client role), you can also use this pre-configured test account:

- **Username:** `client`
- **Password:** `A123456a`

- **How to test:** Log in using these credentials. You will be able to browse the menu, add items to your cart, and proceed to checkout for a delivery/takeaway order.

---

## 👨‍🍳 Staff Operations (Employee Access)

To test the internal restaurant operations (managing incoming orders, updating ticket statuses, etc.), you must log in as an Employee. Employee accounts cannot be registered publicly; they must be created by an Admin.

- **Username:** `employee`
- **Password:** `A123456`

- **How to test:** Log in using these credentials. You will have access to the employee dashboard where you can view all active tickets, manage table states, and process the orders created from the previous steps.
