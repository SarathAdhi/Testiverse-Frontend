"use client";

import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@ui/button";
import { DialogHeader } from "@ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { Mic, Video } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

type Props = {
  webcamRef: React.RefObject<Webcam>;
};

const WebcamVideoRecorder = ({ webcamRef }: Props) => {
  const [selectedCamera, setSelectedCamera] = useState<MediaDeviceInfo>();
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);

  const [selectedAudioInput, setSelectedAudioInput] =
    useState<MediaDeviceInfo>();
  const [audioInputs, setAudioInputs] = useState<MediaDeviceInfo[]>([]);

  const fetchCameras = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setCameras(videoDevices);
      setSelectedCamera(videoDevices?.[0] || null);
    } catch (error) {
      console.error("Error enumerating devices:", error);
    }
  };

  const fetchAudioInputs = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputDevices = devices.filter(
        (device) => device.kind === "audioinput"
      );
      setAudioInputs(audioInputDevices);
      setSelectedAudioInput(audioInputDevices[0] || null);
    } catch (error) {
      console.error("Error enumerating audio devices:", error);
    }
  };

  useEffect(() => {
    fetchCameras();
    fetchAudioInputs();
  }, []);

  const handleCameraChange = (selectedDeviceId: string) => {
    const selectedDevice = cameras.find(
      (device) => device.deviceId === selectedDeviceId
    );
    setSelectedCamera(selectedDevice);
  };

  const handleMicrophoneChange = (selectedDeviceId: string) => {
    const selectedDevice = audioInputs.find(
      (device) => device.deviceId === selectedDeviceId
    );
    setSelectedAudioInput(selectedDevice);
  };

  return (
    <DialogHeader className="space-y-4">
      <div className="grid place-items-center text-center gap-2">
        <Video className="w-14 h-14 stroke-purple-500 bg-gray-800 p-3 rounded-full" />
        <DialogTitle className="text-lg">
          Check Your Camera and Microphone?
        </DialogTitle>

        <DialogDescription className="text-sm">
          {`You are allotted a maximum of 120 seconds for video recording. Rest
            assured, you can preview your video before finalizing the
            submission, and if necessary, you have the option to re-record.`}
        </DialogDescription>
      </div>

      <div className="relative flex flex-col items-center gap-4">
        <div className="z-10 absolute top-4 right-4 space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" className="p-2.5 rounded-full">
                <Video className="stroke-background" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Select Camera</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuRadioGroup
                value={selectedCamera?.deviceId}
                onValueChange={handleCameraChange}
              >
                {cameras.map(({ deviceId, label }) => (
                  <DropdownMenuRadioItem key={deviceId} value={deviceId}>
                    {label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" className="p-2.5 rounded-full">
                <Mic className="stroke-background" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Select Microphone</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuRadioGroup
                value={selectedAudioInput?.deviceId}
                onValueChange={handleMicrophoneChange}
              >
                {audioInputs.map(({ deviceId, label }) => (
                  <DropdownMenuRadioItem key={deviceId} value={deviceId}>
                    {label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Webcam
          className="w-full rounded-lg"
          audio={true}
          ref={webcamRef}
          videoConstraints={{
            facingMode: "user",
            deviceId: selectedCamera?.deviceId,
          }}
          audioConstraints={{ deviceId: selectedAudioInput?.deviceId }}
          mirrored
        />
      </div>
    </DialogHeader>
  );
};

export default WebcamVideoRecorder;
