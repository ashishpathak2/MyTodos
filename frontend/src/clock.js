function setClock() {
    // Get the current time.
    var now = new Date();
  
    // Set the hours, minutes, seconds, and milliseconds to 0.
    now.setHours(0, 0, 0, 0);
  
    // Calculate the difference between the current time and 00:00.
    var difference = now - new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  
    // Set a timer to go off in the difference amount of time.
    setTimeout(function() {
      // Set the clock to 00:00.
      now.setHours(0, 0, 0, 0);
  
      // Call the setClock function again to start the clock over.
      setClock();
    }, difference);
  }
  
  // Call the setClock function to start the clock.
  setClock();