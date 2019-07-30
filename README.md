# Pwnded Passwords Chrome Extension
This is a source code of a proof of concept of a Chrome extension that checks all the passwords user uses and checks them on the fly against [Pwned Passwords](https://haveibeenpwned.com/Passwords) API.

## Workflow schema
- Extension listens to changes on input[type=password].
- Every time change happens, value of the input is checked against the Pwned Passwords API (by range, so it's safer)
- When match is found, user is notified.