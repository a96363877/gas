import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function AddAddress() {
  return (
    <main className="flex min-h-screen flex-col relative">
      <div className="absolute inset-0 z-0">
        <Image src="/kuwait-skyline.jpg" alt="Kuwait Skyline" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col p-6">
        <div className="max-w-md mx-auto w-full bg-gray-900/90 rounded-lg p-6 space-y-6">
          <h1 className="text-2xl font-bold text-white text-center">عنوان جديد</h1>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="governorate" className="text-white">
                المحافظة
              </Label>
              <Select>
                <SelectTrigger id="governorate" className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="--" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="capital">العاصمة</SelectItem>
                  <SelectItem value="hawalli">حولي</SelectItem>
                  <SelectItem value="ahmadi">الأحمدي</SelectItem>
                  <SelectItem value="farwaniya">الفروانية</SelectItem>
                  <SelectItem value="jahra">الجهراء</SelectItem>
                  <SelectItem value="mubarak">مبارك الكبير</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area" className="text-white">
                المنطقة
              </Label>
              <Select>
                <SelectTrigger id="area" className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="--" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="salmiya">السالمية</SelectItem>
                  <SelectItem value="hawalli">حولي</SelectItem>
                  <SelectItem value="kuwait-city">مدينة الكويت</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="block" className="text-white">
                القطعة
              </Label>
              <Select>
                <SelectTrigger id="block" className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="--" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="street" className="text-white">
                رقم الشارع
              </Label>
              <Input id="street" className="bg-gray-800 border-gray-700 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="area2" className="text-white">
                المنطقة
              </Label>
              <Input id="area2" className="bg-gray-800 border-gray-700 text-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avenue" className="text-white">
                الجادة
              </Label>
              <Input id="avenue" className="bg-gray-800 border-gray-700 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="house" className="text-white">
                رقم المنزل
              </Label>
              <Input id="house" className="bg-gray-800 border-gray-700 text-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="floor" className="text-white">
                رقم الدور
              </Label>
              <Input id="floor" className="bg-gray-800 border-gray-700 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="apartment" className="text-white">
                رقم الشقة
              </Label>
              <Input id="apartment" className="bg-gray-800 border-gray-700 text-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile" className="text-white">
                رقم الهاتف المحمول
              </Label>
              <Input id="mobile" className="bg-gray-800 border-gray-700 text-white" />
            </div>
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg">إضافة</Button>

          <Button variant="outline" asChild className="w-full border-gray-700 text-white hover:bg-gray-800">
            <Link href="/">إغلاق</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
