window.onload = function () {
    
//collect all inputs
    let addBtn = document.getElementById('addcontact');
    let name = document.getElementById('fname');
    let num = document.getElementById('phnum');
    let email = document.getElementById('email');
    let address = document.getElementById('address');
    let contact = document.getElementById('contact');
    let cancel = document.getElementById('cancel');
    let save = document.getElementById('save');
    let display = document.getElementById('display');
	let shw = document.getElementById('shw');
	let main = document.getElementById('dis')
    
    //array for collecting the contacts
    let addBook = [];
    
    //object creating function
    function structure(name, num, email, address){
        this.name = name;
        this.num = num;
        this.email = email;
        this.address = address;
    }
    
    //Event listeners
    //displaying input requests
    addBtn.addEventListener('click', function(){
        contact.style.display='inline-block';
    })
    cancel.addEventListener('click', function(){
        contact.style.display='none';
        del();
    })
    
    //handling save button
    save.addEventListener('click',dPlay)
    
    //handling delete,display & edit buttons
    display.addEventListener('click', delet);
    
    
    function dPlay (){
        let check = name.value != '' && num.value != '' && email.value != '' && address.value != '';
        
        if(check){
            let cont = new structure(name.value, num.value, email.value, address.value);
            
            //push into the array
            addBook.push(cont);
            
            //store in localStorage
            localStorage['addressbook'] = JSON.stringify(addBook);
            
            //hide form
            contact.style.display='none';
            
            //clear the formfields
            del();
            
            //displaying the contacts
            dis();
            
        } else {
            alert('At least one field needs to be filled');
        }
    }
        
    function del(){
        let input = document.getElementsByClassName('formField');
        for(let i in input){
            input[i].value = '';
        }
    }  
    
    function dis(){
		display.innerHTML = '';
        if(localStorage['addressbook'] === undefined){
            localStorage['addressbook'] = '[]';
        } else{
            addBook = JSON.parse(localStorage['addressbook']);
            for (let j in addBook){
                let str = "<label><a class='name' data-id=" + j + " href='#'>" + addBook[j].name + "</a></label>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + "<label><a href='#' class='edit'  data-id=" + j +">Edit</a></label>&emsp;&emsp; <label><a class='del' data-id=" + j + " href='#'>Delete</a><label><hr>";
                display.innerHTML += str;
            }
        }
    }
    
    function delet(e){
        if(e.target.classList.contains('del')){
            let dataId = e.target.getAttribute('data-id');
            addBook.splice(dataId, 1);
            localStorage['addressbook'] = JSON.stringify(addBook);
            dis();
        }
		else if(e.target.classList.contains('name')){    
        	
        //    addBook = JSON.parse(localStorage['addressbook']);
				if(shw.innerHTML == ''){
					let dataId = e.target.getAttribute('data-id');
					for (dataId in addBook){
					let st = "<label>Number:</label>&emsp;&emsp;&emsp;&emsp;" + addBook[dataId].num + "<br>" + "<label>Email:</label>&emsp;&emsp;&emsp;&emsp;" + addBook[dataId].email + "<br>" + "<label>Address:</label>&emsp;&emsp;&emsp;&emsp;" + addBook[dataId].address;
						alert("Name:" +"					" + addBook[dataId].name +
							 "Phone Number:" + "					");
//            		shw.innerHTML += st;
					}
				}else if(shw.innerHTML != ''){
					shw.innerHTML = '';
					}
            }
			else if(e.target.classList.contains('edit')){
//				if(localStorage['addressbook'] === undefined){
//            	localStorage['addressbook'] = '[]';
//				} else{
//				addBook = JSON.parse(localStorage['addressbook']);
				let dataId = e.target.getAttribute('data-id');
				for(dataId in addBook){
					contact.style.display = 'inline-block';
					name.value = addBook[dataId].name;
					email.value = addBook[dataId].email;
					num.value = addBook[dataId].num;
					address.value = addBook[dataId].address;
					save.addEventListener('click', function(){
//						addBook[dataId] = [];
						let nv = new structure(name.value, num.value, email.value, address.value);
						addBook[dataId].push(nv);
						localStorage['addressbook'] = JSON.stringify(addBook);
						dis();
//						addBook[l].name = name.value;
//						addBook[l].email = email.value;
//						addBook[l].num = num.value;
//						addBook[l].address = address.value;
						
						
					})
				}
			}
		}
};