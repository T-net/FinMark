export default {
  common: {
    iso: '',
    shortIso: '',
    bbox: [],
    latestYear: null
  },
  intro: { data: [] },
  introAnalysis: { data: [] },
  map: {
    open: true,
    zoom: 3,
    center: { lat: 0, lng: 0 },
    basemap: 'light',
    label: 'dark',
    latLng: { lat: '', lng: '' }
  },
  legend: { open: true },
  sidebar: {
    open: true,
    selected: 'layers',
    menuItem: ''
  },
  modal: {
    open: false,
    options: null
  },
  layers: {
    list: [],
    selectedLayers: [],
    selectedSector: '',
    layersOrder: [],
    layersSettings: {}
  },
  interactions: {},
  analysis: {
    active: false,
    nearby: {
      location: true,
      pin: { active: false, dropped: false },
      time: 30,
      area: {},
      error: null,
      center: { lat: 0, lng: 0 }
    },
    areaOfInterest: {
      drawing: false,
      clearing: false,
      area: {}
    },
    jurisdiction: {
      list: [],
      selectedJurisdiction: {},
      area: {}
    }
  },
  widgets: { list: [] }
};
