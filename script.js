var amount = 10000;
var opts = {
  buttonId: 'bread-checkout-btn',
  items:[{
    name: "Vinyl Set",
    //One product costing $100 is to be purchased
    price: amount,
    sku: "VINYL123",
    imageUrl: "https://cdn.shopify.com/s/files/1/0135/1204/8699/products/KanyeWestFantasy_1024x.png?v=1590697985",
    quantity: 1,
    detailUrl: "https://www.amazon.com/My-Beautiful-Dark-Twisted-Fantasy/dp/B004D7GU3M"
  }],
  asLowAs: true,
  //The button should always be clickable
  actAsLabel: false,

  done: function(err, tx_token) {
    if (err) {
      console.error('there was an error: ', err);
      return;
    }
  if (tx_token !== undefined) {
  //When a user has completed a full checkout, they should receive a success 
   console.log(tx_token);
   var input = document.createElement('input');
   input.type = 'hidden';
   input.name = 'token';
   input.value = tx_token;
   var form = document.createElement('form');
   form.action = '/success.php';
   form.method = 'POST';
   form.appendChild(input);
   document.body.appendChild(form);
   form.submit();
 }
  return;
  },
  //Since this test merchant is pre-configured in Bread’s system with loan offerings, we are able to display an “as low as $” number on the Bread button - show this.
  customCSS: '#bread-button,body,html{height:100%;margin:0;width:100%}body{display:table}#bread-button{background:#FFFFFF;color:#FFFFFF;border:5px solid #ff0000;border-radius:4px;display:table-cell;font-family:"Lucida Console", "Courier New", monospace;font-size:16px;font-weight:400;text-align:center;vertical-align:middle;transition:all .3s ease}#bread-as-low-as:before{content:"As low as "}.bread-text{color:#ff0000}' 
};
opts.calculateTax = function(shippingContact, billingContact, callback) {
  console.log(typeof shippingContact);
  var state = shippingContact.state;
  var taxAmount = 0;
  //The tax charged to a purchaser should be 5% if the shipping address supplied by the customer 
  if(state == "NY")
  {
    console.log("YO");
    taxAmount = amount * .05;
  }
  else
  {
    console.log("SUP");
    taxAmount = 0;
  }
  callback(null, taxAmount);
 
};

//If a user closes the form without completing the checkout:
opts.onCustomerClose = function(err, customer)
{
  var status = customer.state;
  switch(status)
  {
    //If approved, the customer should receive an appropriate message
    case 'PREQUALIFIED':
      showMessage("Congrats, you were prequalified for financing");
      break;
    case 'ABANDONED':
      showMessage("You abandoned your prequalification attempt.");
      break;
    //If declined, they should receive an appropriate message
    case 'NOT_PREQUALIFIED':
      showMessage("We apologize but you were not prequalified for financing");
      break;
    }

};
//There is both a 2-day and an overnight shipping option available for this product
opts.shippingOptions = [{
  typeId: 'ship-type-1',
  cost: 999,
  type: 'Overnight Shipping'
},{
  typeId: 'ship-type-2',
  cost: 599,
  type: '2-day Shipping'  
}]

bread.checkout(opts);

function showMessage(message)
{
  var messageText = $('#message');
  var messageBox = $('#messageBox');
  messageText.text(message);
  messageBox.fadeIn('slow', function(){

    messageBox.delay(3000).fadeOut();
  });
}