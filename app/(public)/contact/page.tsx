export const metadata = {
  title: "Contact PakJobs"
};

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl">Contact</h1>
      <p className="text-sm text-slate-500">
        For partnership inquiries or source corrections, reach us at <a className="text-brand-start" href="mailto:hello@pakjobs.pk">hello@pakjobs.pk</a>.
      </p>
      <p className="text-sm text-slate-500">
        To request removal of a listing, email <a className="text-brand-start" href="mailto:removals@pakjobs.pk">removals@pakjobs.pk</a> with the job link and verified proof.
      </p>
    </div>
  );
}
