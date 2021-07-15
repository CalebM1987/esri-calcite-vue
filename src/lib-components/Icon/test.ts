async function main(){

  try {
    const [
      Map,
      MapView,
    ] = await loadModules<[
      __esri.MapConstructor,
      __esri.MapViewConstructor,
    ]>([
      "esri/Map",
      "esri/views/MapView",
    ])
  
    // work with esri modules here
    const map = new Map({
      
    })
  
  } catch (error) { 
    // handle any script or module loading errors
    console.error(error)
  }

}