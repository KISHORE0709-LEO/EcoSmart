import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Camera, Award, Recycle, Leaf, TrendingUp } from "lucide-react";

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Green",
    email: "alex.green@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatar: "/placeholder-avatar.jpg"
  });

  const stats = [
    { label: "Items Classified", value: "247", icon: Recycle, color: "text-green-600" },
    { label: "Eco Points", value: "1,250", icon: Leaf, color: "text-yellow-600" },
    { label: "Streak Days", value: "15", icon: TrendingUp, color: "text-blue-600" },
    { label: "Level", value: "Eco Warrior", icon: Award, color: "text-purple-600" }
  ];

  const achievements = [
    { title: "First Classification", description: "Classified your first waste item", earned: true },
    { title: "Eco Enthusiast", description: "Classified 100 items", earned: true },
    { title: "Green Streak", description: "7 days consecutive usage", earned: true },
    { title: "Waste Warrior", description: "Classified 500 items", earned: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-16 h-16 bg-green-200/20 rounded-full top-32 left-16 animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute w-12 h-12 bg-yellow-200/30 rounded-full top-20 right-20 animate-[float_6s_ease-in-out_infinite_1s]" />
        <div className="absolute w-20 h-20 bg-green-300/15 rounded-full bottom-40 left-32 animate-[float_10s_ease-in-out_infinite_2s]" />
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Track your eco-friendly journey</p>
        </div>

        {/* Profile Card */}
        <Card className="p-8 bg-white/90 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="text-2xl bg-green-100 text-green-800">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0">
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="text-xl font-bold"
                  />
                  <Input
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                  <Input
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "default" : "outline"}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
                {isEditing && (
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Achievements */}
        <Card className="p-8 bg-white/90 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-600" />
            Achievements
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.earned
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-gray-50 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                  {achievement.earned && (
                    <Badge className="bg-green-100 text-green-800">Earned</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};