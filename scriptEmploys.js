async function obtenerEmpleos() {

    const url = 'https://www.iceenterprise.com/careers/jobs-results/?category=All&location=All';
    const urlpaginaEmpleo = "https://www.iceenterprise.com";
    //const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const proxyUrl = 'https://serene-atoll-35439.herokuapp.com/';
    

    return fetch(proxyUrl + url).then(rsp => rsp.text()).then(resultado => {

        var indiceComienzoBody = resultado.indexOf("<body");
        var indiceFinalBody = resultado.indexOf("</body>");
        var bodyResultado = resultado.substring(indiceComienzoBody, indiceFinalBody + 7);

        var indicePrimerEtiquetaBody = bodyResultado.indexOf(">");
        var bodySinEtiqueta = bodyResultado.substring(indicePrimerEtiquetaBody + 1,bodyResultado.length - 7);
        
        var elementoDiv = document.createElement("div");
        elementoDiv.innerHTML = bodySinEtiqueta;

        var divsEmpleos = elementoDiv.getElementsByClassName("row job-search-result");
        var empleos = [];

        for (let i = 0; i < divsEmpleos.length; i++) {
            var informacionGeneralEmpleo = divsEmpleos[i].getElementsByTagName("div")[0];
            var informacionUrl = divsEmpleos[i].getElementsByTagName("div")[1];
            var hrefUrl = informacionUrl.innerHTML.split(" ")[1];
            var url = urlpaginaEmpleo + hrefUrl.substring(6, hrefUrl.length - 1);
            var titulo = informacionGeneralEmpleo.getElementsByTagName("h3")[0];
            var localizacion = informacionGeneralEmpleo.getElementsByTagName("p")[0];

            var empleo = { "title": titulo.textContent, "url": url, "location": localizacion.textContent };
            empleos.push(empleo);
        }
        
        return empleos;

    }).catch(err => {
        console.log(err.message)
    });
}
async function mostrarEmpleos() {
    var jobs = {"jobs": await obtenerEmpleos() };
    console.log(jobs);
}

mostrarEmpleos();


