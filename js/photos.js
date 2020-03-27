var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var photos;
var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});
closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};
$.get(baseAPIURL + 'photos/list', function(data) {
    console.log(data);
    for (i = 0; i < data.length; i++) {
        var feature = new ol.Feature(data[i]);
        feature.set('nama', data[i].nama);
        var coordinate = [parseFloat(data[i].lon), parseFloat(data[i].lat)];
        var geometry = new ol.geom.Point(coordinate);
        feature.setGeometry(geometry);
        photosSource.addFeature(feature);
    }
});

function refreshOL() {
    photosSource.clear()
    $.get(baseAPIURL + 'photos/list', function(data) {
        console.log(data);
        for (i = 0; i < data.length; i++) {
            var feature = new ol.Feature(data[i]);
            feature.set('nama', data[i].nama);
            var coordinate = [parseFloat(data[i].lon), parseFloat(data[i].lat)];
            var geometry = new ol.geom.Point(coordinate);
            feature.setGeometry(geometry);
            photosSource.addFeature(feature);
            closer.onclick();
        }
    });
}

var photosSource = new ol.source.Vector();
var photosstyle = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 6,
        stroke: new ol.style.Stroke({
            color: 'white',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: 'green'
        })
    })
});
var photoslayer = new ol.layer.Vector({
    source: photosSource,
    style: photosstyle
});
var raster = new ol.layer.Tile({
    source: new ol.source.OSM()
});
var source = new ol.source.Vector({
    wrapX: false
});
var vector = new ol.layer.Vector({
    source: source
});
var map = new ol.Map({
    layers: [raster, vector, photoslayer],
    target: 'olpmap',
    overlays: [overlay],
    view: new ol.View({
        projection: 'EPSG:4326',
        center: [110, -6],
        zoom: 5
    })
});
var typeSelect = 'Point';
var draw;

function addInteraction() {
    var value = typeSelect;
    if (value !== 'None') {
        draw = new ol.interaction.Draw({
            source: source,
            type: typeSelect
        });
        map.addInteraction(draw);
    }
};
typeSelect.onchange = function() {
    map.removeInteraction(draw);
    addInteraction();
};

// $(document).ready(function() {
//     console.log("ready!");

// });

map.on("singleclick", function(evt) {
    content.innerHTML = '';
    var features = '';
    var coordinate = evt.coordinate;
    var lonloatcoor = ol.coordinate.toStringXY(coordinate, 8)
    var hdms = ol.coordinate.toStringHDMS(coordinate);
    features = map.getFeaturesAtPixel(evt.pixel);
    console.log(features, lonloatcoor)
    if (features) {
        id = features[0].get('id');
        nama = features[0].get('nama');
        remark = features[0].get('remark');
        photo = features[0].get('photo');
        content.innerHTML = "<p><strong>" + nama + "</strong></p><p><strong>" + remark + "</strong></p><p><img style='height: 250px;' src='data:image/jpeg;base64," + photo + "'/></div></p><code>" + hdms + "</code><div id='idphoto' style='display:none;'>" + id + "</div><div style='padding-top:10px;'><button id='btn_hapus' type='button' class='btn btn-primary' data-toggle='modal' data-target='#photos_hapus'>Hapus</button></div>";
        $("#btn_hapus").on('click', function() {
            $("#photos_hapus").modal('toggle');
        })
    } else {
        content.innerHTML = '<p>Anda menklik disini:</p><code>' + hdms + "</code><div id='tambahfoto'  style='padding-top:10px;'><a id='btn_tambah' class='btn btn-primary'>Beri Foto</a></div><div id='lon' style='display:none'>" + coordinate[0] + "</div><div id='lat' style='display:none'>" + coordinate[1] + "</div>";
        addInteraction();
        map.removeInteraction(draw);
        $("#btn_tambah").on('click', function() {
            $("#photos_tambah").modal('toggle');
        })
    }
    overlay.setPosition(coordinate);
});