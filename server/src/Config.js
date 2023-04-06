const server_port = 5050;
const client_port = 3000;

const host_url = 'http://localhost';

const full_host_url = host_url + ":" + server_port;
const full_client_url = host_url +":" + client_port;

module.exports={
    full_host_url,
    full_client_url,
    server_port,
    client_port
}