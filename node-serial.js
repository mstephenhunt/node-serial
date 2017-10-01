const SerialPort = require('serialport')

export function writeSerial (options, callback) {
  const {
    portPath,
    baudrate,
    message,
    expectedLength // one-indexed expected length (optional)
  } = options

  if (!portPath || !baudrate || !message) {
    callback('portPath, baudrate, and message required')
    return
  }

  const serial = new SerialPort(portPath, { baudrate })
  const buffer = []

  serial.on('open', function () {
    serial.write(message, function (error) {
      if (error) {
        serial.close()
        callback(error)
        return
      }

      var timeoutExceeded = true
      setTimeout(function () {
        if (timeoutExceeded) {
          serial.close()
          callback('timed out')
        }
      }, timeout)

      serial.on('data', function (data, index) {
        // Convert from buffer to dec array
        const dataJSON = JSON.stringify(data, null, 2)
        const dataObj = JSON.parse(dataJSON)

        dataObj.data.forEach(function (datum) {
          buffer.push(datum)
        })

        // If you've provided an expected length for your message,
        // wait until you've gotten that length back (unless you hit
        // the timeout)
        if (expectedLength && buffer.length === expectedLength) {
          timeoutExceeded = false
          serial.close()
          callback(null, buffer)
        } else if (!expectedLength) {
          timeoutExceeded = false
          serial.close()
          callback(null, buffer)
        }
      })
    })

    // This error catches for unable to write port
    serial.on('error', function (error) {
      serial.close()
      callback(error)
    })
  })

  // This error catch is for being unable to find provided port
  // (as in, the path provided is bad)
  serial.on('error', function (error) {
    callback(error)
  })
}
