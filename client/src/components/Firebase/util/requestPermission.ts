export function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
      else{
        alert("You must allow this permission to get realtime notification")
      }
    })
}