<template>
<div id="form">
    <title>Factuur maken</title>
        <form @submit.prevent="sendRequest">
            <table>
                <tr>
                    <td>
                        <label for="invoice_number">Factuurnummer:</label>
                    </td>
                    <td>
                        <input type="number" placeholder="Factuurnummer" name="invoice_number" v-model="invoice.invoice_number" required>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="customer_name">Naam klant:</label>
                    </td>
                    <td>
                        <input type="text" placeholder="Naam klant" name="customer_name" v-model="invoice.customer_name" required>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="customer_address">Adres klant:</label>
                    </td>
                    <td>
                        <input type="text" placeholder="Straat 123" name="customer_address1" v-model="invoice.customer_address1" required>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <input type="text" placeholder="1111AA Alkmaar" name="customer_address2" v-model="invoice.customer_address2" required>
                    </td>
                <tr>
                    <td>
                        <label for="payment_term">Betaal termijn in dagen:</label>
                    </td>
                    <td>
                        <input type="number" placeholder="Betaaltermijn in dagen" value="7" name="payment_term" v-model="invoice.payment_term" required>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="products">Services:</label>
                    </td>
                    <td>
                        <textarea placeholder="1;website;600\n" name="products" v-model="invoice.products" required></textarea>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="note">Opmerkingen:</label>
                    </td>
                    <td>
                        <input type="text" placeholder="Opmerkingen" v-model="invoice.note" name="note">
                    </td>
                </tr>
            </table>
            <input type="submit" value="Maak factuur aan">
        </form>
        </div>
</template>

<script>
import * as FileSaver from 'file-saver';
import axios from 'axios';
export default {
    data() {
        return {
            invoice: {
                invoice_number: '',
                customer_name: '',
                customer_address1: '',
                customer_address2: '',
                payment_term: '',
                products: '',
                note: ''
            }
        }
    },
    methods: {
        sendRequest: function() {
            let tempArray = this.invoice.products.split('\n');
            let products = [];
            for(let productLine of tempArray) {
                let productArray = productLine.split(';');
                let product = {
                    "aantal": productArray[0],
                    "dienst": productArray[1],
                    "prijs": productArray[2]
                }
                products.push(product);
            }
            this.invoice.products = products;
            const json = JSON.stringify({invoice: this.invoice})
            axios.get('http://localhost:3000/test', {
                params: {
                    json
                }
            }).then(() => {
                setTimeout(() => {  
                    fetch('/makeinvoice',{
                    headers:{
                        "Content-Type": "application/json"
                    },
                    method: "get"
                }).then(res=>res.blob()).then((res=>{
                    console.log(res)
                    FileSaver.saveAs(res, 'kameel');
                }))
                 }, 5000);
                
            })  
        }
    }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    * {
        font-family: Poppins;
    }
    input[type="submit"] {
        transition-duration: 0.3s;
        background-color: black;
        color: white;
        border: 2px solid gray;
        border-radius: 5px;
    }
    input[type="submit"]:hover {
        transition-duration: 0.3s;
        background-color: white;
        color: black;
        cursor: pointer;
    }
</style>

