# Node-Serial Sample
This is a sample `Serial` communication implementation built for a controller that could be communicated with via `Modbus` or `Serial`.

There is one exposed function, `writeSerial()`, that takes in four params:
   * `portPath` _[Required]_ : the direct path to your serial port (for Unix systems, something like `/dev/tty.usbserial`, for Windows `COM10`)
   * `baudRate` _[Required]_ : the baud rate of the controller you're communicating with
   *  `message` _[Required]_: message to send
   *  `expectedLength` _[Optional]_: if there's a message expected to return, pass the expected length of that message here

## Note on Expected Length
Without providing `expectedLength`, the first chunk of information that's provided will immediately cause the `writeSerial()` function to return. The messages coming from the controller this implementation was built on would return messages in chunks, and it was required for the full message to be returned.

## Features
   * `expectedLength` allows for multiple-chunk messages to be queued up before returns to upper layers
   * Timeouts: if either `expectedLength` or no information is returned, the upper layers recieve a timeout message