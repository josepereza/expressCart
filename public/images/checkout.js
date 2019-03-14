// Create a Stripe client.
var stripe = Stripe('pk_test_ztUXQzALnwWMFPm4lR1yhauj');

// Create an instance of Elements.
var elements = stripe.elements();
var card = elements.create('card', {
    'style': {
      'base': {
        'fontFamily': 'Arial, sans-serif',
        'fontSize': '8px',
        'color': '#C1C7CD',
      },
      'invalid': {
        'color': 'red',
      },
    }
  });

// Add an instance of the card UI component into the `card-element` <div>
card.mount('#card-element');
// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)

function stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);
  
    // Submit the form
    form.submit();
  }
  
  function createToken() {
    stripe.createToken(card).then(function(result) {
      if (result.error) {
        // Inform the user if there was an error
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server
        stripeTokenHandler(result.token);
      }
    });
  };
  
  // Create a token when the form is submitted.
  var form = document.getElementById('payment-form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    createToken();
  });

  card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  });