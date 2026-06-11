export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-4xl font-bold">Privacy Policy</h1>

      <p className="mb-4 text-gray-700">Last Updated: June 11, 2026</p>

      <p className="mb-6">
        SultanR respects your privacy and is committed to protecting the
        information used within the application. This Privacy Policy explains
        how SultanR operates and how information is handled when using the app.
      </p>

      <h2 className="mt-8 mb-3 text-2xl font-semibold">About SultanR</h2>

      <p>
        SultanR is a GPS asset tracking application developed for authorized
        customers of Rangs Motors Ltd. Access to the application requires a code
        and password provided by Rangs Motors Ltd.
      </p>

      <h2 className="mt-8 mb-3 text-2xl font-semibold">
        Information Collection
      </h2>

      <p>
        SultanR does not collect, store, sell, or share personal customer
        information such as names, email addresses, phone numbers, or other
        personally identifiable information.
      </p>

      <p className="mt-3">
        The application is used solely for viewing GPS tracking information
        associated with authorized assets linked to credentials provided by
        Rangs Motors Ltd.
      </p>

      <h2 className="mt-8 mb-3 text-2xl font-semibold">Location Information</h2>

      <p>
        SultanR displays the location of GPS-enabled assets. Location data shown
        in the application originates from installed GPS tracking devices and is
        used solely for asset monitoring and tracking purposes.
      </p>

      <h2 className="mt-8 mb-3 text-2xl font-semibold">Permissions Used</h2>

      <div className="space-y-4">
        <div>
          <strong>INTERNET</strong>
          <p>
            Required to communicate with tracking servers and retrieve asset
            information.
          </p>
        </div>

        <div>
          <strong>ACCESS_NETWORK_STATE</strong>
          <p>
            Used to determine network connectivity and improve application
            reliability.
          </p>
        </div>

        <div>
          <strong>CALL_PHONE</strong>
          <p>
            Allows users to directly call support numbers displayed within the
            application.
          </p>
        </div>

        <div>
          <strong>ACCESS_FINE_LOCATION & ACCESS_COARSE_LOCATION</strong>
          <p>
            Used to improve map functionality and user experience within the
            application.
          </p>
        </div>

        <div>
          <strong>POST_NOTIFICATIONS</strong>
          <p>
            Used to deliver notifications and alerts related to tracked assets.
          </p>
        </div>
      </div>

      <h2 className="mt-8 mb-3 text-2xl font-semibold">Data Security</h2>

      <p>
        We take reasonable measures to protect communications between the
        application and our servers against unauthorized access.
      </p>

      <h2 className="mt-8 mb-3 text-2xl font-semibold">Third-Party Services</h2>

      <p>
        SultanR may use third-party services such as mapping, notification, and
        cloud infrastructure providers to deliver application features.
      </p>

      <h2 className="mt-8 mb-3 text-2xl font-semibold">
        Changes to This Policy
      </h2>

      <p>
        This Privacy Policy may be updated from time to time. Any changes will
        be posted on this page.
      </p>

      <h2 className="mt-8 mb-3 text-2xl font-semibold">Contact Us</h2>

      <p>
        If you have any questions regarding this Privacy Policy, please contact
        us.
      </p>

      <div className="mt-4">
        <p>Email: admin@forbit.tech</p>
        <p>Phone: +8801944537714</p>
      </div>
    </div>
  );
}
