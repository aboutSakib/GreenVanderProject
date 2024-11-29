import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebook, FaSquareInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "../Images/logo/logo.jpg";

const Footer = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data, error, isLoading } = useQuery({
    queryKey: ["pageSettings"],
    queryFn: async () => {
      const response = await axios.get(
        `${apiUrl}/api/page-settings/get-settings`
      );
      return response.data;
    },
  });
  console.log("hello", data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <footer className="relative bg-[#002112] text-white py-10">
      {/* Content Layer */}
      <div className="relative container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo and Social Icons */}
          <div className="mb-6 md:mb-0">
            <img className="w-[130px]" loading="lazy" src={logo} alt="লোগো" />
            <div className="flex space-x-4">
              <Link
                to={data?.facebook}
                target="blank"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebook className="text-2xl" />
              </Link>
              <Link
                to={data?.twitter}
                target="blank"
                className="text-gray-400 hover:text-white"
              >
                <FaTwitterSquare className="text-2xl" />
              </Link>
              <Link
                to={data?.instagram}
                target="blank"
                className="text-gray-400 hover:text-white"
              >
                <FaSquareInstagram className="text-2xl" />
              </Link>
            </div>
          </div>

          {/* Collections Links */}
          <div className="mb-6 md:mb-0">
            <h2 className="font-semibold mb-4">সংগ্রহ</h2>
            <ul>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white">
                  শীতকালীন সবজি
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white">
                  ফ্রেশ সবজি
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white">
                 ফ্রেশ ফলসমূহ
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white">
                  নতুন পন্যসমূহ
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white">
                  স্পেশাল অফার
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Links */}
          <div className="mb-6 md:mb-0">
            <h2 className="font-semibold mb-4">সহায়তা</h2>
            <ul>
              <li>
                <Link to="/about-us" className="text-gray-400 hover:text-white">
                  আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white">
                  প্রশ্নোত্তর
                </Link>
              </li>
              <li>
                <Link
                  to="/return-policy"
                  className="text-gray-400 hover:text-white"
                >
                  রিটার্ন এবং ফেরত নীতি
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-white"
                >
                  গোপনীয়তা নীতি
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="font-semibold mb-4">যোগাযোগ</h2>
            <ul>
              <li className="text-gray-400 hover:text-white">
                ০১৮৫২০২৪৩১৮
              </li>
              <li className="text-gray-400 hover:text-white">
              news.shadhinalo@gmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; ২০২৪ গ্রিনভেন্ডার</p>
          <div className="flex space-x-4 mt-4 md:mt-0 font-semibold text-gray-300">
            <Link
              to="/privacy-policy"
              className="text-gray-400 hover:text-white"
            >
              গোপনীয়তা নীতি
            </Link>
            <Link
              to="/terms-condition"
              className="text-gray-400 hover:text-white"
            >
              শর্তাবলী
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
