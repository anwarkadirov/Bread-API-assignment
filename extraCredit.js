
$( document ).ready(function() {
    var linkButton = $("#link");
    linkButton.click(createLink);

    let data = {
	  			options: {
	    		callbackUrl: 'https://google.com',
	    		completeUrl: 'https://google.com',
	    		errorUrl: 'https://youtube.com',
	    		shippingOptions: [
	      		{
	        		typeId: 'ship-type-1',
	  				cost: 999,
	  				type: 'Overnight Shipping'
				},{
	  				typeId: 'ship-type-2',
	  				cost: 599,
	  				type: '2-day Shipping' 
	      		}
	    		],
	    		shippingContact: {
	      			firstName: 'Anwar',
	      			lastName: 'Kadirov',
	     			email: 'anwrkdrv@gmail.com',
	      			address: '123 Main St',
	      			city: 'New York',
	      			state: 'NY',
	      			zip: '10001'
	    		},
	    		billingContact: {
	      			firstName: 'Anwar',
	      			lastName: 'Kadirov',
	      			email: 'anwrkdrv@gmail.com',
	      			address: '123 Main St',
	      			city: 'New York',
	      			state: 'NY',
	      			zip: '10001'
	    		},
	    		items:[{
	    			name: "Vinyl Set",
	    			//One product costing $100 is to be purchased
	    			price: 10000,
	    			sku: "VINYL123",
	    			imageUrl: "https://cdn.shopify.com/s/files/1/0135/1204/8699/products/KanyeWestFantasy_1024x.png?v=1590697985",
	    			quantity: 1,
	    			detailUrl: "https://www.amazon.com/My-Beautiful-Dark-Twisted-Fantasy/dp/B004D7GU3M"
	  			}],
	    		tax: 500
	  			}
		};

    function createLink()
    {
	    $.ajax
		({
  			type: "POST",
  			url: "https://7101ea30-8ae3-47ab-a8bd-235860d36f3e:d0dac82c-7d59-4f95-8390-76a60d9f6b8a@api-sandbox.getbread.com/carts/",
  			contentType: "application/json",	
  			data: JSON.stringify(data),
  			success: function (result){
  				console.log(result.data.url);
  			},
  			error: function(err)
  			{
  				console.log(err);
  			}

		});
    }
});