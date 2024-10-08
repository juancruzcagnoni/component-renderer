"use client";

import { useState, useRef } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Slider } from "../components/ui/slider";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { RocketIcon, CopyIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

export default function ComponentRenderer() {
  const [selectedComponent, setSelectedComponent] = useState("button");
  const [accordionType, setAccordionType] = useState("single");
  const [isCollapsible, setIsCollapsible] = useState(true);
  const [accordionItems, setAccordionItems] = useState([
    {
      title: "Is it accessible?",
      content: "Yes, it adheres to the WAI-ARIA design pattern.",
    },
    {
      title: "Is it styled?",
      content:
        "Yes, it comes with default styles that matches the other components' aesthetic.",
    },
    {
      title: "Is it animated?",
      content:
        "Yes, it's animated by default, but you can disable it if you prefer.",
    },
  ]);
  const [alertTitle, setAlertTitle] = useState("Heads up!");
  const [alertDescription, setAlertDescription] = useState(
    "You can add components to your app using the cli."
  );
  const [alertVariant, setAlertVariant] = useState("default");
  const [buttonText, setButtonText] = useState("Click me");
  const [buttonVariant, setButtonVariant] = useState("default");
  const [buttonSize, setButtonSize] = useState("default");
  const [isLoading, setIsLoading] = useState(false);
  const [roundness, setRoundness] = useState(0);
  const [useCustomColors, setUseCustomColors] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#ffffff");
  const [isCopied, setIsCopied] = useState(false);
  const codeRef = useRef(null);
  const [dialogTitle, setDialogTitle] = useState("Are you absolutely sure?");
  const [dialogDescription, setDialogDescription] = useState(
    "This action cannot be undone. This will permanently delete your account and remove your data from our servers."
  );
  const [dialogTriggerText, setDialogTriggerText] = useState("Open Dialog");
  const [popoverTriggerText, setPopoverTriggerText] = useState("Open Popover");
  const [popoverContent, setPopoverContent] = useState("Your popover content here");

  const addAccordionItem = () => {
    setAccordionItems([...accordionItems, { title: "", content: "" }]);
  };

  const updateAccordionItem = (index, field, value) => {
    const newItems = [...accordionItems];
    newItems[index][field] = value;
    setAccordionItems(newItems);
  };

  const removeAccordionItem = (index) => {
    setAccordionItems(accordionItems.filter((_, i) => i !== index));
  };

  const getCodeForSelectedComponent = () => {
    if (selectedComponent === "accordion") {
      return `
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"

export default function AccordionDemo() {
  return (
    <Accordion type="${accordionType}" ${isCollapsible ? "collapsible" : ""}>
      ${accordionItems
        .map(
          (item, index) => `
      <AccordionItem value="item-${index}">
        <AccordionTrigger>${item.title}</AccordionTrigger>
        <AccordionContent>${item.content}</AccordionContent>
      </AccordionItem>
      `
        )
        .join("")}
    </Accordion>
  )
}`;
    } else if (selectedComponent === "alert") {
      return `
import { RocketIcon } from "@radix-ui/react-icons"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"

export default function AlertDemo() {
  return (
    <Alert variant="${alertVariant}">
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>${alertTitle}</AlertTitle>
      <AlertDescription>${alertDescription}</AlertDescription>
    </Alert>
  )
}`;
    } else if (selectedComponent === "button") {
      return `
import { Button } from "../components/ui/button"
import { Loader2 } from "lucide-react"

export default function ButtonDemo() {
  return (
    <Button
      variant="${buttonVariant}"
      size="${buttonSize}"
      disabled={${isLoading}}
      style={{
        borderRadius: "${roundness}px",
        ${useCustomColors ? `backgroundColor: "${backgroundColor}",` : ""}
        ${useCustomColors ? `color: "${textColor}",` : ""}
      }}
    >
      ${isLoading ? '<Loader2 className="mr-2 h-4 w-4 animate-spin" />' : ''}
      ${buttonText}
    </Button>
  )
}`;
    } else if (selectedComponent === "dialog") {
      return `
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Button } from "../components/ui/button"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">${dialogTriggerText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>${dialogTitle}</DialogTitle>
          <DialogDescription>
            ${dialogDescription}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}`;
    } else if (selectedComponent === "popover") {
      return `
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover"
import { Button } from "../components/ui/button"

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">${popoverTriggerText}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Popover Content</h4>
            <p className="text-sm text-muted-foreground">
              ${popoverContent}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}`;
    }
    return "";
  };

  const copyCode = () => {
    const code = getCodeForSelectedComponent();
    navigator.clipboard.writeText(code)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
  };

  return (
    <>
      <div className="flex justify-between px-6 py-3 border-b">
        <h1 className="text-base font-bold">component renderer</h1>
        <p className="text-sm">built by <a href="" className="font-bold">Juan Cruz Cagnoni</a></p>
      </div>
      <div className="container mx-auto p-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="component">Component</Label>
                <Select
                  value={selectedComponent}
                  onValueChange={setSelectedComponent}
                >
                  <SelectTrigger id="component">
                    <SelectValue placeholder="Select component" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="button">Button</SelectItem>
                    <SelectItem value="alert">Alert</SelectItem>
                    <SelectItem value="accordion">Accordion</SelectItem>
                    <SelectItem value="dialog">Dialog</SelectItem>
                    <SelectItem value="popover">Popover</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {selectedComponent === "accordion" && (
                <>
                  <div>
                    <Label htmlFor="accordionType">Accordion Type</Label>
                    <Select
                      value={accordionType}
                      onValueChange={setAccordionType}
                    >
                      <SelectTrigger id="accordionType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="multiple">Multiple</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="collapsible"
                      checked={isCollapsible}
                      onCheckedChange={setIsCollapsible}
                    />
                    <Label htmlFor="collapsible">Collapsible</Label>
                  </div>
                  <div>
                    <Label>Accordion Items</Label>
                    {accordionItems.map((item, index) => (
                      <div key={index} className="mt-2 p-2 border rounded">
                        <Input
                          placeholder="Title"
                          value={item.title}
                          onChange={(e) =>
                            updateAccordionItem(index, "title", e.target.value)
                          }
                          className="mb-2"
                        />
                        <Textarea
                          placeholder="Content"
                          value={item.content}
                          onChange={(e) =>
                            updateAccordionItem(
                              index,
                              "content",
                              e.target.value
                            )
                          }
                          className="mb-2"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeAccordionItem(index)}
                        >
                          Remove Item
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addAccordionItem}
                      className="mt-2"
                    >
                      Add Item
                    </Button>
                  </div>
                </>
              )}
              {selectedComponent === "alert" && (
                <>
                  <div>
                    <Label htmlFor="alertTitle">Alert Title</Label>
                    <Input
                      id="alertTitle"
                      value={alertTitle}
                      onChange={(e) => setAlertTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="alertDescription">Alert Description</Label>
                    <Input
                      id="alertDescription"
                      value={alertDescription}
                      onChange={(e) => setAlertDescription(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="alertVariant">Variant</Label>
                    <Select
                      value={alertVariant}
                      onValueChange={setAlertVariant}
                    >
                      <SelectTrigger id="alertVariant">
                        <SelectValue placeholder="Select variant" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="destructive">Destructive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              {selectedComponent === "button" && (
                <>
                  <div>
                    <Label htmlFor="buttonText">Button Text</Label>
                    <Input
                      id="buttonText"
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="buttonVariant">Variant</Label>
                    <Select
                      value={buttonVariant}
                      onValueChange={setButtonVariant}
                    >
                      <SelectTrigger id="buttonVariant">
                        <SelectValue placeholder="Select variant" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="destructive">Destructive</SelectItem>
                        <SelectItem value="outline">Outline</SelectItem>
                        <SelectItem value="secondary">Secondary</SelectItem>
                        <SelectItem value="ghost">Ghost</SelectItem>
                        <SelectItem value="link">Link</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="buttonSize">Size</Label>
                    <Select value={buttonSize} onValueChange={setButtonSize}>
                      <SelectTrigger id="buttonSize">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="loadingState"
                      checked={isLoading}
                      onCheckedChange={setIsLoading}
                    />
                    <Label htmlFor="loadingState">Loading State</Label>
                  </div>
                  <div>
                    <Label htmlFor="roundness">Roundness</Label>
                    <Slider
                      id="roundness"
                      min={0}
                      max={24}
                      step={1}
                      value={[roundness]}
                      onValueChange={([value]) => setRoundness(value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="useCustomColors"
                      checked={useCustomColors}
                      onCheckedChange={setUseCustomColors}
                    />
                    <Label htmlFor="useCustomColors">Use Custom Colors</Label>
                  </div>
                  {useCustomColors && (
                    <div className="flex justify-between">
                      <div className="w-full pr-2">
                        <Label htmlFor="backgroundColor">
                          Background Color
                        </Label>
                        <Input
                          id="backgroundColor"
                          type="color"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                        />
                      </div>
                      <div className="w-full pr-2">
                        <Label htmlFor="textColor">Text Color</Label>
                        <Input
                          id="textColor"
                          type="color"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
              {selectedComponent === "dialog" && (
                <>
                  <div>
                    <Label htmlFor="dialogTriggerText">Trigger Text</Label>
                    <Input
                      id="dialogTriggerText"
                      value={dialogTriggerText}
                      onChange={(e) => setDialogTriggerText(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dialogTitle">Dialog Title</Label>
                    <Input
                      id="dialogTitle"
                      value={dialogTitle}
                      onChange={(e) => setDialogTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dialogDescription">Dialog Description</Label>
                    <Textarea
                      id="dialogDescription"
                      value={dialogDescription}
                      onChange={(e) => setDialogDescription(e.target.value)}
                    />
                  </div>
                </>
              )}
              {selectedComponent === "popover" && (
                <>
                  <div>
                    <Label htmlFor="popoverTriggerText">Trigger Text</Label>
                    <Input
                      id="popoverTriggerText"
                      value={popoverTriggerText}
                      onChange={(e) => setPopoverTriggerText(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="popoverContent">Popover Content</Label>
                    <Textarea
                      id="popoverContent"
                      value={popoverContent}
                      onChange={(e) => setPopoverContent(e.target.value)}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center min-h-[200px]">
              {selectedComponent === "accordion" && (
                <div className="w-full"> {/* Añadimos este div con clase w-full */}
                  <Accordion type={accordionType} collapsible={isCollapsible} className="w-full">
                    {accordionItems.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{item.title}</AccordionTrigger>
                        <AccordionContent>{item.content}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
              {selectedComponent === "alert" && (
                <Alert variant={alertVariant}>
                  <RocketIcon className="h-4 w-4" />
                  <AlertTitle>{alertTitle}</AlertTitle>
                  <AlertDescription>{alertDescription}</AlertDescription>
                </Alert>
              )}
              {selectedComponent === "button" && (
                <Button
                  variant={buttonVariant}
                  size={buttonSize}
                  disabled={isLoading}
                  style={{
                    borderRadius: `${roundness}px`,
                    backgroundColor: useCustomColors
                      ? backgroundColor
                      : undefined,
                    color: useCustomColors ? textColor : undefined,
                  }}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {buttonText}
                </Button>
              )}
              {selectedComponent === "dialog" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">{dialogTriggerText}</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{dialogTitle}</DialogTitle>
                      <DialogDescription>{dialogDescription}</DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              )}
              {selectedComponent === "popover" && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">{popoverTriggerText}</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Popover Content</h4>
                        <p className="text-sm text-muted-foreground">
                          {popoverContent}
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </CardContent>
          </Card>
        </div>
        <Card className="mt-4">
          <CardHeader className="flex flex-row items-start justify-between">
            <CardTitle>Code</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={copyCode}>
                    {isCopied ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isCopied ? "Copied!" : "Copy code"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <pre
              className="p-4 rounded-md overflow-x-auto text-sm bg-gray-100"
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {getCodeForSelectedComponent()}
            </pre>
          </CardContent>
        </Card>
      </div>
    </>
  );
}