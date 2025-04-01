import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ProductDescription = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border rounded-lg bg-white shadow-sm">
      {/* Title Section */}
      <div
        className="flex justify-between items-center bg-gray-900 text-white px-6 py-4 cursor-pointer rounded-t-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-semibold">About this item</h2>
        {isOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
      </div>

      {/* Collapsible Content */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="p-6">
          {/* Description */}
          <p className="mb-4">
                Binge on movies and TV episodes, news, sports, music, and more! We insisted on 4K Ultra High Definition 
                for this 50” LED TV, bringing out more lifelike color, texture, and detail. We also partnered with Roku 
                to bring you the best possible content with thousands of channels to choose from, conveniently presented 
                through your own customizable home screen. Watch via cable, satellite, HDTV antenna, or just start streaming 
                from your favorite app. Like the sound of your own voice? You can actually use it with the Roku mobile app to 
                search for the title, artist, actor, or director, or just go old-school with our handy remote. We handle all 
                software updates too, automatically, so all you have to worry about is what to watch. 
              </p>

              <p className="mb-4">
                Lose yourself in the ultimate viewing experience. We're onn.™ to something here. Say goodbye to stressful 
                decision-making and fear of the electronics aisle. Our mission is simple… to deliver great products and 
                make it easy. Choose onn. and get back to using your brainpower for the important things in life like 
                pondering the question, "What should I binge-watch this weekend?"
              </p>

          {/* Features List */}
          <ul className="space-y-2">
                <li><strong>50”</strong> (49.5” actual diagonal) <strong>4K (2160p) UHD LED TV</strong></li>
                <li><strong>4K (2160p) Resolution</strong> - Crystal clear picture, bringing out more lifelike color, texture, and detail</li>
                <li><strong>Roku Smart TV</strong> - Wirelessly stream 500,000+ movies and TV episodes available across thousands of free or paid channels</li>
                <li><strong>Free Mobile App</strong> - Can’t find your remote? Use the Roku mobile app on your smartphone for browsing channels or voice control</li>
                <li><strong>Smart Home Ready</strong> - Works with Apple Home, Amazon Alexa, and Google Home</li>
                <li><strong>60Hz Refresh Rate</strong> - Smooth motion while gaming or watching sports</li>
                <li><strong>VESA Mount Compatible</strong>: 200 x 200 mm</li>
                <li><strong>Connections</strong>: 3 HDMI, 1 Composite, 1 USB, 1 Optical, 1 Coaxial/Cable, 1 LAN, and Headphone</li>
                <li><strong>What's in the box?</strong> 1 onn. Roku TV 50", 1 Roku TV remote control (batteries included), 1 Quick Start Guide, 1 TV stand + hardware</li>
              </ul>

          {/* Disclaimer */}
          <div className="mt-6 text-gray-500 text-sm border-t border-gray-300 pt-3">
            <p>ⓘ We aim to show you accurate product information.</p>
            <a href="#" className="text-blue-600 underline">See our disclaimer</a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDescription;
