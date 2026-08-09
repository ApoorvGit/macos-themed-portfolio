import React from "react";
import FinderSvg from "../assets/icons/finder.svg";
import SafariSvg from "../assets/icons/Safari_browser_logo.svg";
import MailSvg from "../assets/icons/mail.svg";
import PhotosSvg from "../assets/icons/photos.svg";
import TerminalSvg from "../assets/icons/terminal.svg";
import NotesSvg from "../assets/icons/notes.svg";
import FaceTimeSvg from "../assets/icons/facetime.svg";
import MessagesSvg from "../assets/icons/messages.svg";
import SiriSvg from "../assets/icons/siri.svg";

export const FinderIcon: React.FC<{ className?: string }> = ({
  className = "w-full h-full",
}) => <img src={FinderSvg} alt="Finder" className={className} />;

export const SafariIcon: React.FC<{ className?: string }> = ({
  className = "w-full h-full",
}) => <img src={SafariSvg} alt="Safari" className={className} />;

export const TerminalIcon: React.FC<{ className?: string }> = ({
  className = "w-full h-full",
}) => <img src={TerminalSvg} alt="Terminal" className={className} />;

export const PhotosIcon: React.FC<{ className?: string }> = ({
  className = "w-full h-full",
}) => <img src={PhotosSvg} alt="Photos" className={className} />;

export const MailIcon: React.FC<{ className?: string }> = ({
  className = "w-full h-full",
}) => <img src={MailSvg} alt="Mail" className={className} />;

export const NotesIcon: React.FC<{ className?: string }> = ({
  className = "w-full h-full",
}) => <img src={NotesSvg} alt="Notes" className={className} />;

export const FaceTimeIcon: React.FC<{ className?: string }> = ({
  className = "w-full h-full",
}) => <img src={FaceTimeSvg} alt="FaceTime" className={className} />;

export const MessagesIcon: React.FC<{ className?: string }> = ({
  className = "w-full h-full",
}) => <img src={MessagesSvg} alt="Messages" className={className} />;

export const SiriIcon: React.FC<{ className?: string }> = ({
  className = "w-full h-full",
}) => <img src={SiriSvg} alt="Siri" className={className} />;

export const BriefcaseIcon = NotesIcon;
