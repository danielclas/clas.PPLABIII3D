import {Request} from './request.js';
import { Notify } from './notify.js';
import { Form } from './form.js';

const container = document.getElementById('tableContainer');
const keys = [];
let table;
let selectedRow;

export class Table{

    static emptyTable(){

        let temp = document.createElement('table');
        temp.id = "table";

        let thead = temp.createTHead();
        let tbody = temp.createTBody();

        keys.forEach( k => {
            let th = document.createElement('TH');
            th.innerText = this.normalizeHeader(k);
            thead.appendChild(th);
        });

        return temp
    }

    static keys(){
        return keys;
    }

    static selectedId(){
        return selectedRow[0].innerHTML;
    }

    static paintTable(data){

        if(data) this.getKeys(data);
        
        let temp = this.emptyTable();

        if(data.data.length > 0) temp = this.loadTable(data,temp);  
        else Notify.emptyTable(true);     
        
        if(container.children.length > 4) document.querySelector('#table') = temp; 
        else container.appendChild(temp);
        
        table = temp;
        table.onclick = this.getSelectedRow;
    }
    
    static unselectRow(){

        let s = document.getElementsByClassName('selected');
        if(s[0]) s[0].classList.remove('selected');        
        
    }

    static getSelectedRow(e){        
                
        if(e.srcElement.parentNode.parentNode.tagName != 'TBODY') return;        

        Table.unselectRow();

        if(selectedRow==e.srcElement.parentNode.children){
            selectedRow = undefined;
            Form.cleanForm();
            return;
        }

        selectedRow = e.srcElement.parentNode.children;    

        e.srcElement.parentNode.classList.add('selected');

        Form.populateForm(selectedRow);
    }

    static getKeys(data){        
        let temp = data.data[0];

        for(let key in temp)
            keys.push(key);                     
    }

    static loadTable(data, temp){

        data.data.forEach( obj => {
            let row = temp.insertRow();
            keys.forEach( key => {
                let td = document.createElement('TD');
                td.innerHTML = obj[key];
                row.appendChild(td);
            });            
        });        

        return temp;
    }

    static normalizeHeader(text){

        let index = text.indexOf('_');
        let temp = index != -1 ? text.substring(index+1) : text;

        temp = temp[0].toUpperCase() + temp.substring(1);

        return temp;
    }

    // static scrollTable(){
        
    //     let firstRow;

    //     if(table){
    //         firstRow = table.children[1].children[0];
    //         if(firstRow){
    //             let heigth = firstRow.clientHeight;
    //             let top = firstRow.getBoundingClientRect().top;
    //             let thead = table.children[0];
    //             if(top>0){
    //                 thead.style.paddingTop = '0px';
    //             }else{            
    //                 let temp = Math.floor(top/heigth)*-1;
    //                 let offset = table.children[1].children.length * 5;
    //                 thead.style.paddingTop = temp*heigth+offset+'px';  
    //             }
    //         }            
    //         /*
    //             While el row.top sea mayor a 0, acum.
    //             padding = acum;
    //         */
    //     }              
    // }
}