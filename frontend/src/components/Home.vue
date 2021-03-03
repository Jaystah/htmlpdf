<template>
<div id="form">
    <title>Factuur maken</title>
        <form method="post" @submit="sendRequest">
            <table>
                <tr>
                    <td>
                        <label for="invoice_number">Factuurnummer:</label>
                    </td>
                    <td>
                        <input type="number" placeholder="Factuurnummer" name="invoice_number" required>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="customer_name">Naam klant:</label>
                    </td>
                    <td>
                        <input type="text" placeholder="Naam klant" name="customer_name" required>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="customer_address">Adres klant:</label>
                    </td>
                    <td>
                        <input type="text" placeholder="Adres klant" name="customer_address" required>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="payment_term">Betaal termijn in dagen:</label>
                    </td>
                    <td>
                        <input type="number" placeholder="Betaaltermijn in dagen" value="7" name="payment_term" required>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="products">Services:</label>
                    </td>
                    <td>
                        <textarea placeholder="1;website;600\n" name="products" required></textarea>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="note">Opmerkingen:</label>
                    </td>
                    <td>
                        <input type="text" placeholder="Opmerkingen" name="note">
                    </td>
                </tr>
            </table>
            <input type="submit" value="Maak factuur aan">
        </form>
        </div>
</template>

<script>
export default {
  methods: {
    sendRequest: () => {
      alert("Request send");
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

