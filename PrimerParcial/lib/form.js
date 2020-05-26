import {Table} from './table.js';
import { Notify } from './notify.js';
import { anuncio } from './anuncio.js';

let form = document.getElementById('form');

export class Form{

    static formToObject(){

        let obj = {};
        let inputs = document.querySelectorAll('input');
        let options = document.getElementsByTagName('option');
        let transaccion;

        inputs.forEach(input => {
            if(!this.isValidInput(input)) obj = undefined;                    
            if(obj) obj[input.name] = input.value;              
        });

        for (let item of options) {
            if(item.selected){
                transaccion = item.value;
            }   
        }

        if(transaccion && obj) obj['transaccion'] = transaccion;

        return transaccion && obj ? new anuncio(obj) : undefined;
    }

    static cleanForm(){

        let inputs = document.querySelectorAll('input');
        let options = document.getElementsByTagName('option');

        inputs.forEach(input=>{            
            input.value = input.type == 'number' ? 0 : "";            
        });

        for (let item of options) item.selected = false;          

        form.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        Notify.showEditButtons(false);
    }    

    static isValidInput(input){

        if(input.type == 'number' && (isNaN(input.value) || input.value < 0 || input.value == ""))            
                return false;
        else if(input.type == 'text' && input.value == "")
                return false;        

        return true;
    }    

    static populateForm(selectedRow){

        let inputs = document.querySelectorAll('input');
        let keys = Table.keys();
        let transaccion = keys.indexOf('transaccion');
        let options = document.getElementsByTagName('option');

        inputs.forEach( input => {
            let index = keys.indexOf(input.name);
            let value = selectedRow[index].innerHTML;
                
            if(value[0]=='$'){
                let temp = "";                    
                for(let i = 0 ; i<value.length ; i++){
                    if(!isNaN(value[i])) temp+=value[i];
                }    
                value = parseInt(temp);
            }
            input.value = value;                     
        });  

        for(let item of options){
            if(item.value == selectedRow[transaccion]){
                item.selected = true;
            }
        }

        form.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        Notify.showEditButtons(true);
        Notify.invalidForm(false);
    }
}