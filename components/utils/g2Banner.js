import Image from "next/image"
import classNames from "./classNames"
import ReviewStars from "./reviewStar"

const G2Banner = ({ isDarkBackground = false }) => {
  return (
    <div className="flex justify-center pb-2 pt-10 sm:pb-0 sm:pt-6">
      <div className="w-max">
        <a
          href="https://www.g2.com/products/axolo/reviews"
          rel="nofollow noreferrer"
          target={"_blank"}
          className="col-span-2 sm:col-span-1"
        >
          <div className="flex justify-center">
            <div
              className={classNames(
                "w-8",
                isDarkBackground && "mb-1 flex w-10 rounded-full bg-white p-1 "
              )}
            >
              <Image
                width={32}
                height={32.8}
                className={classNames(isDarkBackground && "  ")}
                src="/blog/static/images/partners/g2.png"
                alt="Logo G2"
              />
            </div>
          </div>
          <ReviewStars length={5} />

          <div className="flex justify-center text-center text-sm">
            <p
              className={classNames(
                " text-gray-500 underline underline-offset-2",
                isDarkBackground && "!text-textWhite"
              )}
            >
              4.9/5 star review on G2
            </p>
          </div>
        </a>
      </div>
    </div>
  )
}

export default G2Banner
