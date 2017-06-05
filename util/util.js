function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatTime2(time) {
  // if (typeof time !== 'number' || time < 0) {
  //   return time
  // }
  var hour = time.getHours()
  var minute = time.getMinutes()
  var second = time.getSeconds()
  // var hour = parseInt(time / 3600)
  // time = time % 3600
  // var minute = parseInt(time / 60)
  // time = time % 60
  // var second = time

  return ([hour, minute]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}

function convertTime(stime, etime) {
  var arr1 = stime.split(':');
  var arr2 = etime.split(':');
  if (arr1[0] > arr2[0]) {
    return true;
  }
  else {
    if (arr1[0] == arr2[0]) {
      if (arr1[1] > arr2[1]) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }

}


module.exports = {
  formatTime: formatTime,
  formatTime2: formatTime2,
  formatLocation: formatLocation,
  convertTime: convertTime
}
