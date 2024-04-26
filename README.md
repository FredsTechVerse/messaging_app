# MESSAGING APPLICATION

## BUILD

- Add date to reminders table
- Setup retry functionality for the messages that have not been sent.
- Test with one contact.Send bulk messages. We can console.log everything.

## AFRICAS TALKING API

- One message equivalent to 160 characters
- Sending messages to other lines costs double and doesn't use your senderID , uses africas talking default sender ID
- Individualized & uniform responses for each message sent.

### SHADCDN/UI

- Wonderful realization using its components as normal html components

### INSUFFICIENT BALANCE / ERROR MESSAGE

```js
{
  "SMSMessageData": {
    "Message": "Sent to 0/2 Total Cost: 0",
    "Recipients": [
      {
        "cost": "0",
        "messageId": "None",
        "number": "+254790904509",
        "status": "InsufficientBalance",
        "statusCode": 405
      },
      {
        "cost": "0",
        "messageId": "None",
        "number": "+254112615416",
        "status": "InsufficientBalance",
        "statusCode": 405
      }
    ]
  }
}
```

### SUCCESSFULL MESSAGE

```js
{
  "SMSMessageData": {
    "Message": "Sent to 2/2 Total Cost: KES 1.6000",
    "Recipients": [
      {
        "cost": "KES 0.8000",
        "messageId": "ATXid_fabd5d394a3ca5c081d451d2bea93665",
        "messageParts": 1,
        "number": "+254790904509",
        "status": "Success",
        "statusCode": 101
      },
      {
        "cost": "KES 0.8000",
        "messageId": "ATXid_2e63c8f8c3388459c65f8822445a119d",
        "messageParts": 1,
        "number": "+254112615416",
        "status": "Success",
        "statusCode": 101
      }
    ]
  }
}
```

### INDIVIDUAL MESSAGE

```js
{
  "SMSMessageData": {
    "Message": "Sent to 1/1 Total Cost: KES 4.0000",
    "Recipients": [
      {
        "cost": "KES 4.0000",
        "messageId": "ATXid_a890072360456d3ea892b3aefa03c33f",
        "messageParts": 5,
        "number": "+254112615416",
        "status": "Success",
        "statusCode": 101
      }
    ]
  }
}
```
