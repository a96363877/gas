"use client"

import { useState } from "react"
import Image from "next/image"
import { Moon, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

export default function GasCylinderApp() {
  const [step, setStep] = useState(1)
  const [cylinderCount, setCylinderCount] = useState(1)
  const [selectedDate, setSelectedDate] = useState("27")
  const [selectedDay, setSelectedDay] = useState("الأحد")
  const router=useRouter()

  const incrementCount = () => {
    setCylinderCount((prev) => prev + 1)
  }

  const decrementCount = () => {
    setCylinderCount((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const nextStep = () => {
    if(step ===2 ){
      router.push('/address')
    }
    setStep((prev) => prev + 1)
   
  }

  const prevStep = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const selectDay = (date:any, day:any) => {
    setSelectedDate(date)
    setSelectedDay(day)
  }

  return (
    <div className="min-h-screen bg-[#0f1524] text-white flex flex-col" dir="rtl" style={{zoom:0.9}}>
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-500">سلندر غاز</h1>
        <div className="flex items-center gap-2">
          <Moon className="text-gray-400" size={20} />
          <Button className="bg-green-500 hover:bg-green-600 text-black font-bold rounded-full px-6">اطلب الان</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center gap-10 p-4">
        {step === 1 && (
          <>
            <h2 className="text-2xl text-green-500">حدد عدد الأسطوانات.</h2>

            {/* Navigation Buttons */}
            <div className="flex justify-between w-full max-w-md">
              <Button
                variant="outline"
                className="border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10"
                onClick={nextStep}
              >
                التالي
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-600 hover:bg-gray-600/10">
                السابق
              </Button>
            </div>

            {/* Quantity Selector */}
            <div className="flex justify-center items-center gap-8">
              <Button
                variant="outline"
                className="border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10 w-12 h-12 rounded-lg"
                onClick={incrementCount}
              >
                <Plus size={24} />
              </Button>

              <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                {cylinderCount}
              </div>

              <Button
                variant="outline"
                className="border-gray-600 text-gray-600 hover:bg-gray-600/10 w-12 h-12 rounded-lg"
                onClick={decrementCount}
              >
                <Minus size={24} />
              </Button>
            </div>

            {/* Gas Cylinder Image */}
            <div className="mt-8">
              <img src="https://gaskw.com/storage/form-attachments/01JHBJYXM6BJEYNFC3CAV2K9PQ.png" alt="Gas Cylinder" width={100} height={200} className="object-contain" />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {/* Date Time Selection */}
            <div className="bg-green-500 text-black py-2 px-6 rounded-full text-center mb-4">
              {selectedDate} {selectedDay} 12 ص : 09 م
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between w-full max-w-md">
              <Button variant="outline" className="border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10">
                التالي
              </Button>
              <Button
                variant="outline"
                className="border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10"
                onClick={prevStep}
              >
                السابق
              </Button>
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <Button
                variant="outline"
                className={`border-green-500 hover:bg-green-500/10 p-4 flex flex-col items-center ${
                  selectedDate === "27" ? "bg-green-500 text-black" : "text-green-500"
                }`}
                onClick={() => selectDay("27", "الأحد")}
              >
                <span className="text-sm">27</span>
                <span>الأحد</span>
              </Button>

              <Button
                variant="outline"
                className={`border-green-500 hover:bg-green-500/10 p-2 flex flex-col items-center ${
                  selectedDate === "28" ? "bg-green-500 text-black" : "text-green-500"
                }`}
                onClick={() => selectDay("28", "الاثنين")}
              >
                <span className="text-sm">28</span>
                <span>الاثنين</span>
              </Button>

              <Button
                variant="outline"
                className={`border-green-500 hover:bg-green-500/10 p-2 flex flex-col items-center ${
                  selectedDate === "29" ? "bg-green-500 text-black" : "text-green-500"
                }`}
                onClick={() => selectDay("29", "الثلاثاء")}
              >
                <span className="text-sm">29</span>
                <span>الثلاثاء</span>
              </Button>

              <Button
                variant="outline"
                className={`border-green-500 hover:bg-green-500/10 p-4 flex flex-col items-center ${
                  selectedDate === "30" ? "bg-green-500 text-black" : "text-green-500"
                }`}
                onClick={() => selectDay("30", "الأربعاء")}
              >
                <span className="text-sm">30</span>
                <span>الأربعاء</span>
              </Button>
            </div>

            <Separator className="w-full max-w-md my-4" />

            {/* Time Display */}
            <div className="bg-green-500 text-black py-3 px-8 rounded-lg text-center text-xl">12 ص : 09 م</div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="p-8 text-center">
        <h2 className="text-sm font-bold mb-4 text-gray-300">سلندر غاز</h2>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
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
      </footer>
    </div>
  )
}
