import Image from 'next/image'

const LandingImage = () => (
  <div className="tw-w-full tw-px-8 tw-object-fill">
    <Image
      className="tw-rounded-md"
      src='/landing.jpeg'
      alt='landing image'
      layout='responsive'
      width={1280}
      height={860}
    />
  </div>
)

export default LandingImage