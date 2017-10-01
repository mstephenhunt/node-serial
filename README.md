# Node-Serial
This is a sample `Serial` communication implementation built for a controller that could be communicated with via `Modbus` or `Serial`.

There is one exposed function, `writeSerial`, that takes in four params:
   * [Required] `portPath`: the direct path to your serial port (for Unix systems, something like `/dev/tty.usbserial`, for Windows `COM10`)
   * [Required] `baudRate`: the baud rate of the controller you're communicating with
   * [Required] `message`: message to send
   * [Optional] `expectedLength`: if there's a message expected to return, pass the expected length of that message here
