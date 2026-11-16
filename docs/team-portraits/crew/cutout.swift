import Foundation
import Vision
import CoreImage
import AppKit

let args = CommandLine.arguments
guard args.count == 3 else { print("usage: cutout in out"); exit(2) }
let input = CIImage(contentsOf: URL(fileURLWithPath: args[1]))!
let handler = VNImageRequestHandler(ciImage: input)
let request = VNGenerateForegroundInstanceMaskRequest()
try handler.perform([request])
guard let result = request.results?.first else { print("no subject"); exit(1) }
let mask = try result.generateScaledMaskForImage(forInstances: result.allInstances, from: handler)
let maskImage = CIImage(cvPixelBuffer: mask)
let filter = CIFilter(name: "CIBlendWithMask")!
filter.setValue(input, forKey: kCIInputImageKey)
filter.setValue(CIImage.empty(), forKey: kCIInputBackgroundImageKey)
filter.setValue(maskImage, forKey: kCIInputMaskImageKey)
let ctx = CIContext()
let out = filter.outputImage!
let cs = CGColorSpace(name: CGColorSpace.sRGB)!
try ctx.writePNGRepresentation(of: out, to: URL(fileURLWithPath: args[2]), format: .RGBA8, colorSpace: cs)
print("ok")
