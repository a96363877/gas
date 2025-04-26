"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Moon, Plus, Minus, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"
import Link from "next/link"

export default function GasCylinderApp() {
  const [step, setStep] = useState(1)
  const [cylinderCount, setCylinderCount] = useState(1)
  const [selectedDate, setSelectedDate] = useState("27")
  const [selectedDay, setSelectedDay] = useState("الأحد")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const incrementCount = () => {
    setCylinderCount((prev) => prev + 1)
  }

  const decrementCount = () => {
    setCylinderCount((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const selectDay = (date:any, day:any) => {
    setSelectedDate(date)
    setSelectedDay(day)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return null
  }

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100 text-gray-900" : "bg-[#0f1524] text-white"} flex flex-col`}
      dir="rtl"
    >
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <h1 className={`text-3xl font-bold ${theme === "light" ? "text-green-600" : "text-green-500"}`}>سلندر غاز</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === "dark" ? (
              <Moon className="h-5 w-5 text-gray-400" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-500" />
            )}
          </Button>
          <Button
            className={`${theme === "light" ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"} text-white font-bold rounded-full px-6`}
          >
            اطلب الان
          </Button>
          <Button
            className={`${theme === "light" ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"} text-white font-bold rounded-full px-6`}
          >
            تسجيل الدخول
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center gap-10 p-4">
        {step === 1 && (
          <>
            <h2 className={`text-2xl ${theme === "light" ? "text-green-600" : "text-green-500"}`}>
              حدد عدد الأسطوانات.
            </h2>

            {/* Navigation Buttons */}
            <div className="flex justify-between w-full max-w-md">
              <Button
                variant="outline"
                className={`${theme === "light" ? "border-blue-600 text-blue-600 hover:bg-blue-50" : "border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10"}`}
                onClick={nextStep}
              >
                التالي
              </Button>
              <Button
                variant="outline"
                className={`${theme === "light" ? "border-gray-400 text-gray-500 hover:bg-gray-50" : "border-gray-600 text-gray-600 hover:bg-gray-600/10"}`}
              >
                السابق
              </Button>
            </div>

            {/* Quantity Selector */}
            <div className="flex justify-center items-center gap-8">
              <Button
                variant="outline"
                className={`${theme === "light" ? "border-blue-600 text-blue-600 hover:bg-blue-50" : "border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10"} w-12 h-12 rounded-lg`}
                onClick={incrementCount}
              >
                <Plus size={24} />
              </Button>

              <div
                className={`${theme === "light" ? "bg-green-600" : "bg-green-500"} w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold text-white`}
              >
                {cylinderCount}
              </div>

              <Button
                variant="outline"
                className={`${theme === "light" ? "border-gray-400 text-gray-500 hover:bg-gray-50" : "border-gray-600 text-gray-600 hover:bg-gray-600/10"} w-12 h-12 rounded-lg`}
                onClick={decrementCount}
              >
                <Minus size={24} />
              </Button>
            </div>

            {/* Gas Cylinder Image */}
            <div className="mt-8">
              <Image src="/gas-cylinder.png" alt="Gas Cylinder" width={100} height={200} className="object-contain" />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {/* Date Time Selection */}
            <div
              className={`${theme === "light" ? "bg-green-600" : "bg-green-500"} text-white py-2 px-6 rounded-full text-center mb-4`}
            >
              {selectedDate} {selectedDay} 12 ص : 09 م
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between w-full max-w-md">
              <Button
                variant="outline"
                className={`${theme === "light" ? "border-blue-600 text-blue-600 hover:bg-blue-50" : "border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10"}`}
              >
                التالي
              </Button>
              <Button
                variant="outline"
                className={`${theme === "light" ? "border-blue-600 text-blue-600 hover:bg-blue-50" : "border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10"}`}
                onClick={prevStep}
              >
                السابق
              </Button>
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <Button
                variant="outline"
                className={`${
                  theme === "light"
                    ? `border-green-600 hover:bg-green-50 p-4 flex flex-col items-center ${selectedDate === "27" ? "bg-green-600 text-white" : "text-green-600"}`
                    : `border-green-500 hover:bg-green-500/10 p-4 flex flex-col items-center ${selectedDate === "27" ? "bg-green-500 text-black" : "text-green-500"}`
                }`}
                onClick={() => selectDay("27", "الأحد")}
              >
                <span className="text-xl">27</span>
                <span>الأحد</span>
              </Button>

              <Button
                variant="outline"
                className={`${
                  theme === "light"
                    ? `border-green-600 hover:bg-green-50 p-4 flex flex-col items-center ${selectedDate === "28" ? "bg-green-600 text-white" : "text-green-600"}`
                    : `border-green-500 hover:bg-green-500/10 p-4 flex flex-col items-center ${selectedDate === "28" ? "bg-green-500 text-black" : "text-green-500"}`
                }`}
                onClick={() => selectDay("28", "الاثنين")}
              >
                <span className="text-xl">28</span>
                <span>الاثنين</span>
              </Button>

              <Button
                variant="outline"
                className={`${
                  theme === "light"
                    ? `border-green-600 hover:bg-green-50 p-4 flex flex-col items-center ${selectedDate === "29" ? "bg-green-600 text-white" : "text-green-600"}`
                    : `border-green-500 hover:bg-green-500/10 p-4 flex flex-col items-center ${selectedDate === "29" ? "bg-green-500 text-black" : "text-green-500"}`
                }`}
                onClick={() => selectDay("29", "الثلاثاء")}
              >
                <span className="text-xl">29</span>
                <span>الثلاثاء</span>
              </Button>

              <Button
                variant="outline"
                className={`${
                  theme === "light"
                    ? `border-green-600 hover:bg-green-50 p-4 flex flex-col items-center ${selectedDate === "30" ? "bg-green-600 text-white" : "text-green-600"}`
                    : `border-green-500 hover:bg-green-500/10 p-4 flex flex-col items-center ${selectedDate === "30" ? "bg-green-500 text-black" : "text-green-500"}`
                }`}
                onClick={() => selectDay("30", "الأربعاء")}
              >
                <span className="text-xl">30</span>
                <span>الأربعاء</span>
              </Button>
            </div>

            <Separator className={`w-full max-w-md my-4 ${theme === "light" ? "bg-gray-300" : ""}`} />

            {/* Time Display */}
            <div
              className={`${theme === "light" ? "bg-green-600" : "bg-green-500"} ${theme === "light" ? "text-white" : "text-black"} py-3 px-8 rounded-lg text-center text-xl`}
            >
              12 ص : 09 م
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className={`text-2xl ${theme === "light" ? "text-green-600" : "text-green-500"}`}>تأكيد الطلب</h2>

            {/* Order Summary */}
            <div
              className={`${theme === "light" ? "bg-white shadow-md" : "bg-[#1a2234]"} p-6 rounded-lg w-full max-w-md`}
            >
              <div className="flex justify-between items-center mb-4">
                <span className={`${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>عدد الأسطوانات:</span>
                <span className={`${theme === "light" ? "text-green-600" : "text-green-500"} font-bold`}>
                  {cylinderCount}
                </span>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className={`${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>موعد التوصيل:</span>
                <span className={`${theme === "light" ? "text-green-600" : "text-green-500"} font-bold`}>
                  {selectedDate} {selectedDay}
                </span>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className={`${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>وقت التوصيل:</span>
                <span className={`${theme === "light" ? "text-green-600" : "text-green-500"} font-bold`}>
                  12 ص : 09 م
                </span>
              </div>

              <Separator className={`my-4 ${theme === "light" ? "bg-gray-300" : ""}`} />

              <div className="flex justify-between items-center mb-4">
                <span className={`${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>سعر الأسطوانة:</span>
                <span className={`${theme === "light" ? "text-green-600" : "text-green-500"} font-bold`}>5 د.ك</span>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className={`${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>رسوم التوصيل:</span>
                <span className={`${theme === "light" ? "text-green-600" : "text-green-500"} font-bold`}>1 د.ك</span>
              </div>

              <Separator className={`my-4 ${theme === "light" ? "bg-gray-300" : ""}`} />

              <div className="flex justify-between items-center text-xl font-bold">
                <span className={`${theme === "light" ? "text-gray-900" : "text-white"}`}>المجموع:</span>
                <span className={`${theme === "light" ? "text-green-600" : "text-green-500"}`}>
                  {cylinderCount * 5 + 1} د.ك
                </span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between w-full max-w-md mt-6">
              <Button
                className={`${theme === "light" ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"} ${theme === "light" ? "text-white" : "text-black"} font-bold px-8 py-6 text-lg`}
              >
                تأكيد الطلب
              </Button>
              <Button
                variant="outline"
                className={`${theme === "light" ? "border-blue-600 text-blue-600 hover:bg-blue-50" : "border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10"}`}
                onClick={prevStep}
              >
                السابق
              </Button>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="p-8 text-center">
        <h2 className={`text-4xl font-bold mb-4 ${theme === "light" ? "text-gray-800" : "text-gray-300"}`}>
          سلندر غاز
        </h2>
        <p className={`${theme === "light" ? "text-gray-700" : "text-gray-400"} max-w-2xl mx-auto leading-relaxed`}>
          مرحبا بكم في خدمة توصيل اسطوانات الغاز المنزلية الرائدة في الكويت! نحن نسعى لتقديم حلول سريعة وموثوقة وبأسعار
          معقولة لجميع احتياجات الغاز الخاصة بك.
        </p>
        <div className="mt-4">
          <Image
            src="/kuwait-skyline.jpg"
            alt="Kuwait Skyline"
            width={800}
            height={200}
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
        <div className="mt-4">
          <Link
            href="/"
            className={`${theme === "light" ? "text-blue-600 hover:text-blue-800" : "text-blue-400 hover:text-blue-300"}`}
          >
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </footer>
    </div>
  )
}
