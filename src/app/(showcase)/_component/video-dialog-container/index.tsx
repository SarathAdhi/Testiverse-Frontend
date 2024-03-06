"use client";

import { useDialogHandler } from "@hooks/use-dialog-handler";
import { ShowcaseType } from "@schemas/showcaseSchema";
import { Button } from "@ui/button";
import { Dialog, DialogContent } from "@ui/dialog";
import { Input } from "@ui/input";
import { Video } from "lucide-react";
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import VideoSubmitForm from "./video-submit-form";
import WebcamVideoRecorder from "./webcam-video-capturing";

type Props = {
  collectStarRating: boolean;
  customFields: ShowcaseType["customFields"];
  showcase: string;
  videoBtn: ShowcaseType["buttonData"]["video"];
};

const VideoDialogContainer = ({
  collectStarRating,
  customFields,
  showcase,
  videoBtn,
}: Props) => {
  const webcamRef = useRef<Webcam | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [recordedVideoUrl, setRecordedVideoUrl] = useState("");
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [capturing, setCapturing] = useState(false);
  const [isStoppedCapturing, setIsStoppedCapturing] = useState(false);
  const [file, setFile] = useState<Blob>();

  const { isDialogOpen, onOpenChange, onOpen, onClose } = useDialogHandler();

  // Event handlers
  const handleDataAvailable = ({ data }: BlobEvent) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  };

  const handleStartCaptureClick = () => {
    setRecordedVideoUrl("");

    setCapturing(true);

    mediaRecorderRef.current = new MediaRecorder(
      webcamRef.current?.stream as MediaStream,
      {
        mimeType: "video/webm",
      }
    );

    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );

    mediaRecorderRef.current.start();
  };

  const handleStopCaptureClick = () => {
    mediaRecorderRef.current?.stop();

    setIsStoppedCapturing(true);
    setCapturing(false);
  };

  const handlePreview = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });

      setFile(blob);

      const url = URL.createObjectURL(blob);
      setRecordedVideoUrl(url);

      setRecordedChunks([]);
    }
  };

  const handleUploadVideo = (uploadFile: File) => {
    setIsStoppedCapturing(true);
    setCapturing(false);

    setFile(uploadFile);

    const url = URL.createObjectURL(uploadFile);
    setRecordedVideoUrl(url);
  };

  function handleDeleteVideo() {
    setRecordedVideoUrl("");
    setIsStoppedCapturing(false);
  }

  return (
    <>
      <Button
        style={{
          backgroundColor: videoBtn.bgColor,
          color: videoBtn.color,
        }}
        size="lg"
        className="rounded-full border hover:opacity-90"
        onClick={onOpen}
      >
        <Video className="mr-2 w-5 h-5" color={videoBtn.color} />
        {videoBtn.label}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl overflow-auto max-h-[90svh] ">
          <div className="w-full h-full space-y-4">
            {recordedVideoUrl ? (
              <VideoSubmitForm
                {...{
                  videoSrc: recordedVideoUrl,
                  handleDeleteVideo,
                  file,
                  collectStarRating,
                  customFields,
                  showcase,
                  onClose,
                }}
              />
            ) : (
              <WebcamVideoRecorder webcamRef={webcamRef} />
            )}

            <div className="flex flex-col items-center">
              {!isStoppedCapturing &&
                (capturing ? (
                  <Button
                    variant="destructive"
                    onClick={handleStopCaptureClick}
                  >
                    Stop Capture
                  </Button>
                ) : (
                  <div className="grid gap-2 w-full max-w-60">
                    <Button onClick={handleStartCaptureClick}>
                      Start Capture
                    </Button>

                    <Button
                      onClick={() => fileInputRef?.current?.click()}
                      variant="ghost"
                    >
                      Choose a File to Submit
                    </Button>

                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="video/mp4,video/x-m4v,video/*"
                      onChange={(e) => handleUploadVideo(e.target?.files?.[0]!)}
                      hidden
                    />
                  </div>
                ))}

              {recordedChunks.length > 0 && (
                <Button onClick={handlePreview}>Preview</Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoDialogContainer;
