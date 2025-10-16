import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import {useState} from "react";
import 'leaflet/dist/leaflet.css';


export default function MuseumMap ({lon,lat}){
    return <MapContainer
        className="map-container"
            center={{ lat: lat, lng: lon }}
            zoom={13}
            scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        <Marker position={{ lat: lat, lng: lon }}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
        </MapContainer>


}
