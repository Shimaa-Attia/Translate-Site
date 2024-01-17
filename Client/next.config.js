/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects(){
        return [
            {
                source:'/',
                destination:'/public',
                permanent:true,
          
            }
        ]
    }
}

module.exports = nextConfig 
