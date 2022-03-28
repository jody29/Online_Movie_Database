self.addEventListener('install', event => {
    console.log('install')
})

self.addEventListener('active', event => {
    console.log('active')
})

self.addEventListener('fetch', event => {
    console.log(event)
})