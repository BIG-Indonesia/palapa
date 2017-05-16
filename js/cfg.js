// Base Gsmanager API URL 
var baseAPIURL = 'http://REPGSMANAGERDOM:8000/api/';
// Base Geoserver WMS URL
var baseGSURL = 'http://REPGSMANAGERDOM:8080/geoserver/wms';
// Base Tile Layer for layer preview
var baseXYZLayer = 'http://portal.ina-sdi.or.id/arcgis/rest/services/IGD/RupabumiIndonesia/MapServer/tile/{z}/{y}/{x}';
// Base Center/Zoom for layer preview
var previewCenter = {
    lat: -2.5,
    lon: 118,
    zoom: 5,
    projection: 'EPSG:4326',
    bounds: []
};
