*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family:sans-serif;
    background:#f5f5f5;
    color:#333;
    padding:15px;
}

header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:15px;
}

h1{
    font-size:28px;
}

.day-select{
    display:flex;
    gap:10px;
    align-items:center;
}

.main-grid{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:15px;
    margin-bottom:15px;
}

.panel{
    background:white;
    border-radius:12px;
    padding:15px;
    box-shadow:0 2px 8px rgba(0,0,0,0.1);
}

.panel h2{
    margin-bottom:12px;
}

.input-row{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:10px;
}

.input-row input{
    width:80px;
    padding:8px;
}

button{
    width:100%;
    border:none;
    border-radius:10px;
    padding:12px;
    background:#3b82f6;
    color:white;
    font-weight:bold;
    cursor:pointer;
}

button:hover{
    background:#2563eb;
}

.summary{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:15px;
    margin-bottom:15px;
}

.summary-card{
    background:white;
    border-radius:12px;
    padding:20px;
    text-align:center;
    box-shadow:0 2px 8px rgba(0,0,0,0.1);
}

.summary-card p{
    font-size:30px;
    font-weight:bold;
    margin-top:10px;
}

.stock-row{
    display:flex;
    justify-content:space-between;
    padding:10px 0;
    border-bottom:1px solid #eee;
}

.stock-warning{
    color:orange;
    font-weight:bold;
}

.stock-danger{
    color:red;
    font-weight:bold;
}

.waiting-item{
    display:flex;
    justify-content:space-between;
    align-items:center;
    background:#fafafa;
    border:1px solid #ddd;
    padding:10px;
    border-radius:8px;
    margin-bottom:8px;
}

.waiting-item button{
    width:auto;
    padding:8px 12px;
}

table{
    width:100%;
    border-collapse:collapse;
}

th{
    background:#efefef;
}

th,
td{
    border:1px solid #ddd;
    padding:8px;
    text-align:center;
}

.button-group{
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    gap:10px;
}

#salesChart{
    max-height:300px;
}

@media(max-width:900px){

    .main-grid{
        grid-template-columns:1fr;
    }

    .summary{
        grid-template-columns:1fr;
    }

    .button-group{
        grid-template-columns:1fr;
    }

}
