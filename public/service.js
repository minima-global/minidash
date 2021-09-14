const MinimaEventTypes = {
    CONNECTED: 'connected',
    NEWBLOCK: 'newblock',
    NEWTRANSACTION: 'newtransaction',
    NEWTXPOW: 'newtxpow',
    NEWBALANCE: 'newbalance',
    NETWORK: 'network',
    TXPOWSTART: 'txpowstart',
    TXPOWEND: 'txpowend'
}

Minima.init(function(msg){
    switch(msg.event) {
        case MinimaEventTypes.CONNECTED:
            onConnected(msg.info)
            break;
        case MinimaEventTypes.NEWBLOCK:
            onNewBlock(msg.info)
            break;
        case MinimaEventTypes.NEWTRANSACTION:
            onNewTransaction(msg.info)
            break;
        case MinimaEventTypes.NEWTXPOW:
            onNewTxPow(msg.event)
            break;
        case MinimaEventTypes.NEWBALANCE:
            onNewBalance(msg.info)
            break;
        case MinimaEventTypes.NETWORK:
            onNetwork(msg.info)
            break;
        case MinimaEventTypes.TXPOWSTART:
            onTxPowStart(msg.info)
            break;
        case MinimaEventTypes.TXPOWEND:
            onTxPowEnd(msg.info)
            break;
        default:
            Minima.log('ERROR Unknown event type: ' + msg.event)
    }
    
});


function onConnected(connectedData) {
    // Minima.log('connected event')
    createMetricsTable();
}

function onNewBlock(newBlockData) {
    // Minima.log('new block event')
    const txpow = newBlockData.txpow
    const blockNumber = parseInt(txpow.header.block)
    const transactionCount = txpow.body.txnlist.length
    // Minima.log('block ' + blockNumber + ' has ' + transactionCount + ' transactions')

    // each row will be a new block
    // with transaction and status information
    buildMetricRow(blockNumber, transactionCount)
}

function onNewTransaction(newTransactionData) {
    // Minima.log('new transaction event')
}

function onNewTxPow(newTxPowData) {
    // Minima.log('new txpow event')
}

function onNewBalance(newBalanceData) {
    // Minima.log('new balance event')
}

function onNetwork(networkData) {
    // Minima.log('network event')
}

function onTxPowStart(txPowStartData) {
    // Minima.log('txpow start event')
}

function onTxPowEnd(txPowEndData) {
    // Minima.log('txpow end event')
}



function createMetricsTable() {
    const statusSQL = 'CREATE TABLE IF NOT EXISTS metrics(' +
                        'id INT PRIMARY KEY AUTO_INCREMENT, ' +
                        'time VARCHAR(160), ' +
                        'ram VARCHAR(160), ' +
                        'chainlength INT, ' +
                        'chainspeed DECIMAL(16,3), ' +
                        'chainweight VARCHAR(160), ' +
                        'difficulty VARCHAR(160), ' +
                        'blockNumber INT, ' +
                        'transactionCount INT);'

    Minima.sql(statusSQL, function(resp){
        if(!resp.status){
            Minima.log("Error creating metrics table " + resp.message);
        }
    })
}


function buildMetricRow(blockNumber, transactionCount) {
    Minima.cmd('status', function(respJSON) {
        const response = respJSON.response;
        const metric = {
            time: response.time,
            ram: response.ram,
            chainlength: response.chainlength,
            chainspeed: response.chainspeed,
            chainweight: response.chainweight,
            difficulty: response.difficulty,
            blockNumber: blockNumber,
            transactionCount: transactionCount
        }
        storeMetric(metric)
    })
}


function storeMetric(metric) {
    const MAX_ROWS_IN_TABLE = 4320; // 4k rows is about 1 day (at 20s per block)
    const INSERT = "INSERT INTO metrics (time, ram, chainlength, chainspeed, chainweight, difficulty, blockNumber, transactionCount) VALUES (";
    const SQL = INSERT +
                '\'' + metric.time + '\', ' +
                '\'' + metric.ram + '\', ' +
                metric.chainlength + ', ' +
                metric.chainspeed + ', ' +
                '\'' + metric.chainweight + '\',' +
                '\'' + metric.difficulty + '\',' +
                metric.blockNumber + ', ' +
                metric.transactionCount +
                ')';
    
    Minima.sql(SQL, function(res){
        if(res.status == true) { 
            // Minima.log("metric row added success");
        }
    });

    // delete oldest rows
    Minima.sql(clipMetricsTable(MAX_ROWS_IN_TABLE), function(res){
        if(res.status == true) { 
            // Minima.log("deleted oldest rows");
        }
    });

}


// uses block number to define age, not timestamp
function clipMetricsTable(numberOfRowsToKeep) {
    return 'DELETE FROM METRICS ' +
            'WHERE id NOT IN (' +
                'SELECT id ' +
                'FROM METRICS ' +
                'ORDER BY blockNumber DESC ' +
                'LIMIT ' + numberOfRowsToKeep +
            ')'
}


